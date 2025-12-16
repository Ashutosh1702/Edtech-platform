import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import SyllabusPage from "./pages/SyllabusPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import CheckoutPage from "./pages/CheckoutPage";
import OnlineTestPage from "./pages/OnlineTestPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/online-test" element={<OnlineTestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
