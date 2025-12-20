// controllers/orderController.js
const Course = require("../models/Course");
const { paypal, paypalClient } = require("../config/paypal");
const Order = require("../models/Order"); // PayPalOrder model exported from here
const { URL } = require("url");

function getFrontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:3000";
}

function getBackendUrl() {
  return process.env.BACKEND_URL || "http://localhost:5000";
}

function getPayPalCurrency() {
  return process.env.PAYPAL_CURRENCY || "USD";
}

const createOrder = async (req, res, next) => {
  try {
      if (!req.user || !req.user._id) {
      res.status(401);
      return next(new Error("Unauthorized: user not authenticated"));
    }

    const { courseId, email } = req.body;

    if (!courseId) {
      res.status(400);
      return next(new Error("courseId is required"));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404);
      return next(new Error("Course not found"));
    }

    const courseAmount = course.price; // e.g. 499
    const currency = getPayPalCurrency();

    const client = paypalClient();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    const backendUrl = getBackendUrl();
    const frontendUrl = getFrontendUrl();
    const returnUrl = new URL("/api/orders/capture", backendUrl);
    returnUrl.searchParams.set("redirect", "1");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: course._id.toString(),
          description: course.title,
          amount: {
            currency_code: currency,
            value: courseAmount.toFixed(2), // "499.00"
          },
        },
      ],
      application_context: {
        return_url: returnUrl.toString(),
        cancel_url: `${frontendUrl}/payment-success?success=0`,
      },
    });

    // PayPal पर order create call
    const order = await client.execute(request);
    console.log(
      "PAYPAL ORDER RESULT ===>",
      JSON.stringify(order.result, null, 2)
    );

    const orderId = order.result.id;
    const approveLink = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;

    // 🧾 DB में order save
    const localOrder = await Order.create({
      user: req.user._id, // मान रहा हूँ auth middleware से आया है
      course: course._id,
      paypal_order_id: orderId,
      paypal_email: req.user.email,
      amount: courseAmount,
      currency,
      status: "pending",
      isPaid: false,
      paymentMethod: "paypal",
    });

    return res.status(200).json({
      success: true,
      localOrderId: localOrder._id,
      orderId,
      approveLink,
      amount: courseAmount,
      currency,
      course: {
        id: course._id,
        title: course.title,
        slug: course.slug,
      },
    });
  } catch (error) {
    console.error("PayPal createOrder error (raw):", error);

    // 👉 असली PayPal error details
    if (error.response) {
      console.error("PayPal error status:", error.response.statusCode);
      console.error(
        "PayPal error body:",
        JSON.stringify(error.response.result, null, 2)
      );
    }

    res.status(500);
    return next(new Error("Failed to create PayPal order"));
  }
};

const captureOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId || req.query.token;
    const payerId = req.body.payerId || req.query.PayerID;

    if (!orderId) {
      res.status(400);
      return next(new Error("orderId (PayPal token) is required"));
    }

    const client = paypalClient();

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({}); // empty body

    const capture = await client.execute(request);

    console.log(
      "PAYPAL CAPTURE RESULT ===>",
      JSON.stringify(capture.result, null, 2)
    );

    const status = capture.result.status; // e.g. "COMPLETED"

    const purchaseUnit = capture.result.purchase_units?.[0];
    const paymentCapture =
      purchaseUnit?.payments?.captures?.[0] ||
      purchaseUnit?.payments?.authorizations?.[0];

    const paypal_capture_id = paymentCapture?.id;
    const amount = paymentCapture?.amount?.value;
    const currency = paymentCapture?.amount?.currency_code;
    const email = capture.result.payer?.email_address;
    const finalPayerId = payerId || capture.result.payer?.payer_id;
    const courseId = purchaseUnit?.reference_id || null; // हमने createOrder में यहीं course._id डाला था

    // 🔍 DB में existing order ढूँढो
    let order = await Order.findOne({ paypal_order_id: orderId });

    if (!order) {
      console.warn("No local Order found for paypal_order_id:", orderId);
      // 👉 अगर पहले createOrder से save नहीं हुआ था,
      // तो अब capture के time पे नया order बना लेते हैं
      if (!courseId) {
        // courseId ना मिले तो validation error से बचने के लिए
        res.status(400);
        return next(new Error("Course reference missing in PayPal order"));
      }

      order = await Order.create({
        user: req.user?._id, // route को protect करोगे तो ये आएगा
        course: courseId,
        paypal_order_id: orderId,
        paypal_capture_id,
        paypal_payer_id: finalPayerId,
        paypal_email: email,
        amount: Number(amount),
        currency,
        status: status === "COMPLETED" ? "success" : "failed",
        isPaid: status === "COMPLETED",
        paymentMethod: "paypal",
      });
    } else {
      // ✅ Existing order update
      order.status = status === "COMPLETED" ? "success" : "failed";
      order.isPaid = status === "COMPLETED";
      order.paypal_capture_id = paypal_capture_id;
      order.paypal_payer_id = finalPayerId;
      order.paypal_email = email || order.paypal_email;
      order.amount = Number(amount);
      order.currency = currency;
      await order.save();
    }

    if (req.method === "GET" && req.query.redirect === "1") {
      const frontendUrl = getFrontendUrl();
      const redirectUrl = new URL("/payment-success", frontendUrl);
      redirectUrl.searchParams.set("status", status || "");
      redirectUrl.searchParams.set("orderId", orderId || "");
      redirectUrl.searchParams.set("localOrderId", order._id.toString());
      if (paypal_capture_id) redirectUrl.searchParams.set("captureId", paypal_capture_id);
      if (amount != null) redirectUrl.searchParams.set("amount", String(amount));
      if (currency) redirectUrl.searchParams.set("currency", String(currency));
      return res.redirect(302, redirectUrl.toString());
    }

    return res.status(200).json({
      success: status === "COMPLETED",
      status,
      orderId,
      paypal_capture_id,
      payerId: finalPayerId,
      amount,
      currency,
      order,
    });
  } catch (error) {
    console.error("PayPal captureOrder error (raw):", error);

    if (error.response) {
      console.error("PayPal error status:", error.response.statusCode);
      console.error(
        "PayPal error body:",
        JSON.stringify(error.response.result, null, 2)
      );
    }

    res.status(500);
    return next(new Error("Failed to capture PayPal order"));
  }
};

//@ get all aorders

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500);
    return next(new Error("Failed to fetch orders"));
  }
};

const getSingleOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
    }).populate({
      path: "course",
      select:"title targetExam language price -_id",
    });
    if (!order) {
      res.status(404);
      return next(new Error("Order not found"));
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500);
    return next(new Error("Failed to fetch the order"));
  }
};

module.exports = { createOrder, captureOrder, getAllOrders, getSingleOrder };
