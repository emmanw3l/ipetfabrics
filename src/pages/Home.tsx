import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ProductSection } from "@/components/ProductSection";
import { About, Contact } from "@/components/AboutContact";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { isFirebaseConfigured } from "@/firebase/config";

function SetupBanner() {
  if (isFirebaseConfigured) return null;
  return (
    <div className="bg-brand-red text-white text-center small fw-medium px-3 py-2">
      Firebase isn't configured yet — add your project details to a{" "}
      <code className="bg-black bg-opacity-25 text-white px-1 rounded">
        .env
      </code>{" "}
      file. See the README for step-by-step setup.
    </div>
  );
}

export function Home() {
  return (
    <div>
      <SetupBanner />
      <Navbar />
      <Hero />

      <ProductSection
        id="fabrics"
        eyebrow="By the yard"
        title="Fabrics"
        description="Ankara, lace, brocade, and more — pick your yardage and we'll have it ready."
        category="fabric"
        emptyMessage="No fabrics listed yet — check back soon."
      />

      <ProductSection
        id="clothes"
        eyebrow="Ready to wear"
        title="Clothes"
        description="Finished pieces, cut and sewn in-house, ready to ship or pick up."
        category="clothing"
        emptyMessage="No clothing items listed yet — check back soon."
      />

      <About />
      <Contact />
      <Footer />
      <CartDrawer />
    </div>
  );
}
