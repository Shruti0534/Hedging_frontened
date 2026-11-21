import { ArrowRight, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const Front = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const selectLanguage = (selectedLanguage: "en" | "hi") => {
    setLanguage(selectedLanguage);
    navigate("/login");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ef] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-16">
          <section className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 shadow-sm">
              <img
                src="/logoo.png"
                alt=""
                className="h-10 w-10 object-contain"
              />
              <span className="text-sm font-bold tracking-wide text-emerald-950">
                Kisan Vyapaar
              </span>
            </div>

            <div className="mx-auto mt-8 flex max-w-xl justify-center rounded-3xl bg-white/70 p-3 shadow-sm ring-1 ring-black/5 lg:mx-0 lg:justify-start">
              <img
                src="/project2.png"
                alt="Trade Seekho: empowering farmers and connecting markets"
                className="h-48 w-full object-contain sm:h-56"
              />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
              Learn. Trade. Grow.
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Trade Seekho
              <span className="mt-2 block text-2xl font-semibold text-slate-600 sm:text-3xl">
                Empowering Farmers, Connecting Markets
              </span>
            </h1>
          </section>

          <section
            aria-labelledby="language-heading"
            className="mx-auto w-full max-w-lg rounded-3xl border border-white bg-white p-6 shadow-xl shadow-emerald-950/10 sm:p-9"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <Languages size={24} aria-hidden="true" />
            </div>

            <p className="text-sm font-semibold text-emerald-700">Get started</p>
            <h2
              id="language-heading"
              className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Choose your language
            </h2>
            <p className="mt-2 text-slate-500">अपनी भाषा चुनें</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={language === "en"}
                onClick={() => selectLanguage("en")}
                className="group flex min-h-20 items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-900">
                    EN
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">English</span>
                    <span className="text-sm text-slate-500">Continue in English</span>
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-800"
                />
              </button>

              <button
                type="button"
                aria-pressed={language === "hi"}
                onClick={() => selectLanguage("hi")}
                className="group flex min-h-20 items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-900">
                    हिं
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">हिन्दी</span>
                    <span className="text-sm text-slate-500">हिन्दी में जारी रखें</span>
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-800"
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Front;
