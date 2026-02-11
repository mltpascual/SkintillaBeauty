import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import IngredientsSection from "@/components/IngredientsSection";
import BundlesSection from "@/components/BundlesSection";
import SkincareQuiz from "@/components/SkincareQuiz";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import SocialFeed from "@/components/SocialFeed";
import FAQSection from "@/components/FAQSection";
import LoyaltyTeaser from "@/components/LoyaltyTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RecentlyViewed from "@/components/RecentlyViewed";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <StorySection />
      <ProductsSection />
      <IngredientsSection />
      <SkincareQuiz />
      <BundlesSection />
      <BeforeAfterGallery />
      <SocialFeed />
      <FAQSection />
      <LoyaltyTeaser />
      <TestimonialsSection />
      <Footer />
      <ScrollToTop />
      <RecentlyViewed />
    </div>
  );
}
