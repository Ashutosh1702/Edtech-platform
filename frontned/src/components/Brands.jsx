import { useCallback, useEffect, useRef } from "react";

function Brands() {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const companies = [
    {
      name: "Microsoft",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
      alt: "Microsoft",
    },
    {
      name: "Walmart",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/walmart.svg",
      alt: "Walmart",
    },
    {
      name: "Accenture",
      src: "https://cdn.simpleicons.org/accenture",
      alt: "Accenture",
    },
    {
      name: "Adobe",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
      alt: "Adobe",
    },
    {
      name: "PayPal",
      src: "https://cdn.simpleicons.org/paypal",
      alt: "PayPal",
    },
    {
      name: "Google",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
      alt: "Google",
    },
    {
      name: "Amazon",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
      alt: "Amazon",
    },
    {
      name: "Apple",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg",
      alt: "Apple",
    },
    {
      name: "Meta",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
      alt: "Meta",
    },
    {
      name: "Netflix",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg",
      alt: "Netflix",
    },
    {
      name: "Tesla",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tesla.svg",
      alt: "Tesla",
    },
    {
      name: "IBM",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg",
      alt: "IBM",
    },
    {
      name: "Oracle",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg",
      alt: "Oracle",
    },
    {
      name: "Intel",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/intel.svg",
      alt: "Intel",
    },
    {
      name: "Samsung",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg",
      alt: "Samsung",
    },
    {
      name: "Cisco",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg",
      alt: "Cisco",
    },
    {
      name: "Salesforce",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg",
      alt: "Salesforce",
    },
    {
      name: "Spotify",
      src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg",
      alt: "Spotify",
    },
  ];

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  const scroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const scrollAmount = 200; // Width of one company card + gap
    el.scrollLeft += scrollAmount;

    // Reset to beginning when reaching the end
    if (el.scrollLeft >= el.scrollWidth / 3) {
      el.scrollLeft = 0;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(scroll, 2000); // Scroll every 2 seconds
  }, [scroll]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 text-slate-700 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-slate-500 mb-2 font-semibold">
            Trusted by learners from
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Top Companies Worldwide
          </h2>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>

          <div
            ref={trackRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:scale-105 group"
              >
                <img
                  src={company.src}
                  alt={`${company.alt} logo`}
                  className="h-10 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<span class="text-slate-600 font-semibold text-sm">${company.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brands;
