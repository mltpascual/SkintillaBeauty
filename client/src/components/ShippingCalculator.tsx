/*
 * Skintilla Beauty — Botanical Atelier Design
 * ShippingCalculator: Interactive widget for estimated delivery & cost
 * Placed below the bundles section — fully mobile responsive
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
    <div ref={sectionRef} className="fade-up mt-10 sm:mt-14 lg:mt-18">
      <div
        className="relative overflow-hidden border rounded-xl p-4 sm:p-6 lg:p-8 transition-colors duration-500"
        style={{
          borderColor: isDark ? "oklch(0.28 0.015 55)" : "oklch(0.88 0.02 75)",
          background: isDark ? "oklch(0.20 0.015 55)" : "oklch(0.98 0.008 80)",
        }}
      >
        {/* Decorative corner — hidden on mobile for cleaner look */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-[0.06] hidden sm:block">
          <Truck className="w-full h-full text-[oklch(0.72_0.10_80)]" strokeWidth={0.5} />
        </div>

        {/* Header */}
        <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border shrink-0 transition-colors duration-500"
            style={{
              borderColor: "oklch(0.72 0.10 80 / 0.3)",
              background: isDark ? "oklch(0.24 0.015 55)" : "oklch(0.96 0.015 80)",
            }}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[oklch(0.72_0.10_80)]" strokeWidth={1.5} />
          </div>
          <div>
            <h4
              className={`text-[0.92rem] sm:text-[1rem] font-semibold ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shipping Estimate
            </h4>
            <p
              className={`text-[0.7rem] sm:text-[0.75rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Free standard shipping on all orders over $75
            </p>
          </div>
        </div>

        {/* Input row — stacks on very small screens */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ""));
              setResults(null);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="Enter zip code"
            className={`w-full sm:w-auto sm:flex-1 sm:max-w-[200px] px-4 py-2.5 sm:py-2.5 rounded-full text-[0.85rem] border outline-none transition-all duration-300 focus:ring-2 focus:ring-[oklch(0.72_0.10_80/0.3)] ${
              isDark
                ? "bg-[oklch(0.16_0.015_55)] border-[oklch(0.28_0.015_55)] text-[oklch(0.90_0.015_75)] placeholder:text-[oklch(0.45_0.015_55)]"
                : "bg-[oklch(0.96_0.015_80)] border-[oklch(0.88_0.02_75)] text-[oklch(0.25_0.03_55)] placeholder:text-[oklch(0.65_0.02_75)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
            aria-label="Zip code"
          />
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-[0.72rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-body)",
              background: isDark ? "oklch(0.50 0.05 145)" : "oklch(0.38 0.04 145)",
              color: "oklch(0.98 0.008 80)",
            }}
            aria-label="Calculate shipping"
          >
            Calculate
          </button>
        </div>

        {/* Error */}
        {error && (
          <p
            className="mt-3 text-[0.78rem] sm:text-[0.8rem] text-[oklch(0.577_0.245_27.325)]"
            style={{ fontFamily: "var(--font-body)" }}
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Results */}
        {results && (
          <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
            {results.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.method}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border transition-colors duration-300 ${
                    isDark
                      ? "border-[oklch(0.28_0.015_55)] bg-[oklch(0.18_0.015_55)]"
                      : "border-[oklch(0.90_0.02_75)] bg-[oklch(0.97_0.01_80)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Icon className="w-4 h-4 text-[oklch(0.72_0.10_80)] shrink-0" strokeWidth={1.5} />
                    <div>
                      <p
                        className={`text-[0.82rem] sm:text-[0.85rem] font-medium ${isDark ? "text-[oklch(0.90_0.015_75)]" : "text-[oklch(0.25_0.03_55)]"}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {r.method}
                      </p>
                      <p
                        className={`text-[0.7rem] sm:text-[0.75rem] ${isDark ? "text-[oklch(0.55_0.015_55)]" : "text-[oklch(0.50_0.03_55)]"} font-light`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {r.days}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
                    {r.cost === "Free" && (
                      <CheckCircle className="w-3.5 h-3.5 text-[oklch(0.50_0.05_145)]" strokeWidth={2} />
                    )}
                    <span
                      className={`text-[0.85rem] sm:text-[0.9rem] font-semibold ${
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
              className={`text-[0.65rem] sm:text-[0.7rem] ${isDark ? "text-[oklch(0.45_0.015_55)]" : "text-[oklch(0.60_0.03_55)]"} font-light text-center mt-2`}
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
