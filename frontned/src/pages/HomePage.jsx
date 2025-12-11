import Brands from "../components/Brands";
import CoursesGrid from "../components/CoursesGrid";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function HomePage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-white">
      <Hero />

      <Brands />
      <CoursesGrid />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

export default HomePage;
