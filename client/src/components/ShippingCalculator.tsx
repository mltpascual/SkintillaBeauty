/*
 * Skintilla Beauty — Botanical Atelier Design
 * ShippingCalculator: Interactive widget for estimated delivery & cost
 * Placed below the bundles section for convenience
 */
import { useState } from "react";
import { Truck, MapPin, Clock, CheckCircle } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ShippingResult {
  method: string;
  cost: string;
  days: string;
  icon: typeof Truck;
}

function estimateShipping(zip: string): ShippingResult[] {
  // Simulate shipping estimates based on zip code region
  const firstDigit = parseInt(zip[0], 10);
  const isEastCoast = firstDigit >= 0 && firstDigit <= 3;
  const isWestCoast = firstDigit >= 8 && firstDigit <= 9;

  if (isEastCoast) {
    return [
      { method: "Standard", cost: "Free", days: "3–5 business days", icon: Truck },
      { method: "Express", cost: "$9.95", days: "1–2 business days", icon: Clock },
    ];
  } else if (isWestCoast) {
    return [
      { method: "Standard", cost: "Free", days: "5–7 business days", icon: Truck },
      { method: "Express", cost: "$12.95", days: "2–3 business days", icon: Clock },
    ];
  }
  return [
    { method: "Standard", cost: "Free", days: "4–6 business days", icon: Truck },
    { method: "Express", cost: "$11.95", days: "2–3 business days", icon: Clock },
  ];
}

export default function ShippingCalculator() {
  const { isDark } = useDarkMode();
  const sectionRef = useScrollReveal();
  const [zip, setZip] = useState("");
  const [results, setResults] = useState<ShippingResult[] | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setResults(null);
    if (!/^\d{5}$/.test(zip)) {
      setError("Please enter a valid 5-digit US zip code.");
      return;
    }
    setResults(estimateShipping(zip));
  };

  return (
    <div ref={sectionRef} className="fade-up mt-14 lg:mt-18">
      <div
        className="relative overflow-hidden border rounded-xl p-6 lg:p-8 transition-colors duration-500"
        style={{
          borderColor: isDark ? "oklch(0.28 0.015 55)" : "oklch(0.88 0.02 75)",
          background: isDark ? "oklch(0.20 0.015 55)" : "oklch(0.98 0.008 80)",
        }}
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.06]">
          <Truck className="w-full h-full text-[oklch(0.72_0.10_80)]" strokeWidth={0.5} />
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg border transition-colors duration-500"
            style={{
              borderColor: "oklch(0.72 0.10 80 / 0.3)",
              background: isDark ? "oklch(0.24 0.015 55)" : "oklch(0.96 0.015 80)",
            }}
          >
            <MapPin className="w-4 h-4 text-[oklch(0.72_0.10_80)]" strokeWidth={1.5} />
          </div>
          <div>
            <h4
              className={`text-[1rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shipping Estimate
            </h4>
            <p
              className={`text-[0.75rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Free standard shipping on all orders over $75
            </p>
          </div>
        </div>

        {/* Input row */}
        <div className="flex gap-3">
          <input
            type="text"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setResults(null);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="Enter zip code"
            className={`flex-1 max-w-[180px] px-4 py-2.5 rounded-full text-[0.85rem] border outline-none transition-all duration-300 focus:ring-2 focus:ring-[oklch(0.72_0.10_80/0.3)] ${
              isDark
                ? "bg-[oklch(0.16_0.015_55)] border-[oklch(0.28_0.015_55)] text-[oklch(0.90_0.015_75)] placeholder:text-[oklch(0.45_0.015_55)]"
                : "bg-[oklch(0.96_0.015_80)] border-[oklch(0.88_0.02_75)] text-[oklch(0.25_0.03_55)] placeholder:text-[oklch(0.65_0.02_75)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          />
          <button
            onClick={handleCalculate}
            className="px-5 py-2.5 rounded-full text-[0.72rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-body)",
              background: isDark ? "oklch(0.50 0.05 145)" : "oklch(0.38 0.04 145)",
              color: "oklch(0.98 0.008 80)",
            }}
          >
            Calculate
          </button>
        </div>

        {/* Error */}
        {error && (
          <p
            className="mt-3 text-[0.8rem] text-[oklch(0.577_0.245_27.325)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {error}
          </p>
        )}

        {/* Results */}
        {results && (
          <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
            {results.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.method}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? "border-[oklch(0.28_0.015_55)] bg-[oklch(0.18_0.015_55)]"
                      : "border-[oklch(0.90_0.02_75)] bg-[oklch(0.97_0.01_80)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[oklch(0.72_0.10_80)]" strokeWidth={1.5} />
                    <div>
                      <p
                        className={`text-[0.85rem] font-medium ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {r.method}
                      </p>
                      <p
                        className={`text-[0.75rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {r.days}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.cost === "Free" && (
                      <CheckCircle className="w-3.5 h-3.5 text-[oklch(0.50_0.05_145)]" strokeWidth={2} />
                    )}
                    <span
                      className={`text-[0.9rem] font-semibold ${
                        r.cost === "Free"
                          ? isDark ? "text-[oklch(0.50_0.05_145)]" : "text-[oklch(0.38_0.04_145)]"
                          : isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {r.cost}
                    </span>
                  </div>
                </div>
              );
            })}
            <p
              className={`text-[0.7rem] ${isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"} font-light text-center mt-2`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Estimates based on zip code {zip}. Actual delivery times may vary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
