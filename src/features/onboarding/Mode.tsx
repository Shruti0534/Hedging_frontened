import { ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

type AppMode = "seekho" | "vyapaar";

const Mode = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<AppMode>(mode);

  const continueToMode = () => {
    setMode(selectedMode);
    navigate(selectedMode === "seekho" ? "/seekho" : "/app/dashboard");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-gold/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:gap-16 lg:px-12">
        <section className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-card/80 px-4 py-2 shadow-sm">
            <img src="/logoo.png" alt="" className="h-10 w-10 object-contain" />
            <span className="text-sm font-bold tracking-wide text-foreground">
              Kisan Vyapaar
            </span>
          </div>
          <div className="mx-auto mt-8 flex max-w-xl justify-center rounded-3xl bg-card/70 p-3 shadow-sm ring-1 ring-ring/5 lg:mx-0">
            <img
              src="/project2.png"
              alt="Trade Seekho: empowering farmers and connecting markets"
              className="h-48 w-full object-contain sm:h-56"
            />
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-accent-foreground">
            Learn. Trade. Grow.
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Choose how you want to grow
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0 mx-auto">
            Start with risk-free learning or explore the trading dashboard.
          </p>
        </section>

        <section
          aria-labelledby="mode-heading"
          className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/10 sm:p-9"
        >
          <p className="text-sm font-semibold text-accent-foreground">Select your experience</p>
          <h2
            id="mode-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Choose your mode
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              aria-pressed={selectedMode === "seekho"}
              onClick={() => setSelectedMode("seekho")}
              className={`rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedMode === "seekho"
                  ? "border-ring bg-accent ring-1 ring-ring"
                  : "border-border hover:border-ring hover:bg-accent/50"
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-accent-foreground shadow-sm">
                <BookOpen size={24} aria-hidden="true" />
              </span>
              <span className="mt-5 block text-lg font-bold text-foreground">
                Seekho mode
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                Learn market basics and practice hedging without risk.
              </span>
            </button>

            <button
              type="button"
              aria-pressed={selectedMode === "vyapaar"}
              onClick={() => setSelectedMode("vyapaar")}
              className={`rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedMode === "vyapaar"
                  ? "border-ring bg-accent ring-1 ring-ring"
                  : "border-border hover:border-ring hover:bg-accent/50"
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-gold-foreground shadow-sm">
                <TrendingUp size={24} aria-hidden="true" />
              </span>
              <span className="mt-5 block text-lg font-bold text-foreground">
                Vyapaar mode
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                Open your trading dashboard and manage your market activity.
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={continueToMode}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Continue with {selectedMode === "seekho" ? "Seekho" : "Vyapaar"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </section>
      </div>
    </main>
  );
};

export default Mode;
