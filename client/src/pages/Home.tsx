import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import IngredientsSection from "@/components/IngredientsSection";
import BundlesSection from "@/components/BundlesSection";
import SkincareQuiz from "@/components/SkincareQuiz";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ProductsSection />
      <IngredientsSection />
      <SkincareQuiz />
      <BundlesSection />
      <BeforeAfterGallery />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
