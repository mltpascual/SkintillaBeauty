import { AnnouncementBarProvider } from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import IngredientsSection from "@/components/IngredientsSection";
import BundlesSection from "@/components/BundlesSection";
import SkincareQuiz from "@/components/SkincareQuiz";
import RoutineBuilder from "@/components/RoutineBuilder";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import SkinJournal from "@/components/SkinJournal";
import SocialFeed from "@/components/SocialFeed";
import FAQSection from "@/components/FAQSection";
import LoyaltyTeaser from "@/components/LoyaltyTeaser";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import RecentlyViewed from "@/components/RecentlyViewed";
import LoadingScreen from "@/components/LoadingScreen";
import { CompareProvider } from "@/components/ProductComparison";

export default function Home() {
  return (
    <AnnouncementBarProvider>
      <CompareProvider>
      <LoadingScreen />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[oklch(0.38_0.04_145)] focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <StorySection />
          <ProductsSection />
          <IngredientsSection />
          <SkincareQuiz />
          <RoutineBuilder />
          <BundlesSection />
          <BeforeAfterGallery />
          <SkinJournal />
          <SocialFeed />
          <FAQSection />
          <LoyaltyTeaser />
          <TestimonialsSection />
        </main>
        <Footer />
        <ScrollToTop />
        <RecentlyViewed />
      </div>
      </CompareProvider>
    </AnnouncementBarProvider>
  );
}
