import { BarChart3, BookOpen, Check, FileCheck2, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const features = [
  {
    icon: BarChart3,
    title: "Mandi price insights",
    description: "Follow market prices and explore forecasts based on current data and past trends.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: BookOpen,
    title: "Learn at your pace",
    description: "Build your trading knowledge with farmer lessons and multilingual AI guidance.",
    color: "bg-gold text-gold-foreground",
  },
  {
    icon: FileCheck2,
    title: "Farmer–buyer contracts",
    description: "Trade through blockchain-backed contracts between farmers and buyers.",
    color: "bg-secondary text-secondary-foreground",
  },
];

const languages = [
  { value: "en", badge: "EN", label: "English", description: "Continue in English" },
  { value: "hi", badge: "अ", label: "हिन्दी", description: "हिन्दी में जारी रखें" },
] as const;

const Front = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const selectLanguage = (selectedLanguage: "en" | "hi") => {
    setLanguage(selectedLanguage);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 font-bold tracking-tight sm:text-lg">
            <img src="/logoo.png" alt="" className="size-9 rounded-lg bg-card object-contain sm:size-10" />
            Kisan Vyapaar
          </div>
          <a
            href="#get-started"
            className="shrink-0 rounded-full border border-input px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:px-5"
          >
            Get started
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-12 pt-5 sm:px-8 sm:pt-8 lg:px-12">
        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-5">
          <section aria-labelledby="front-title" className="relative isolate flex min-h-[23rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-[#173629] p-6 text-white sm:min-h-[29rem] sm:p-10 lg:p-11">
            <img
              src="/harvest-field.jpg"
              alt=""
              fetchPriority="high"
              className="absolute inset-0 -z-20 size-full object-cover object-center"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(12deg,#092317_4%,#102e20d9_37%,#102e2066_69%,#102e201a_100%)]" />

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#e6efc1]">Trade Seekho</p>
            <h1 id="front-title" className="max-w-[13ch] font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">
              From harvest <em className="text-[#e5eea8]">to market.</em>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f2f6e9] sm:text-lg">
              Learn how crop markets work, follow mandi prices, and trade with confidence. Built for farmers, buyers, and farmer producer organizations.
            </p>
          </section>

          <section
            id="get-started"
            aria-labelledby="language-heading"
            className="flex scroll-mt-4 flex-col justify-center rounded-[1.75rem] border border-border bg-card p-6 sm:p-9"
          >
            <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Languages size={21} aria-hidden="true" />
            </span>
            <h2 id="language-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Choose your language
            </h2>
            <p lang="hi" className="mt-1.5 text-muted-foreground">अपनी भाषा चुनें</p>

            <div className="mt-6 grid gap-3">
              {languages.map(({ value, badge, label, description }) => (
                <button
                  key={value}
                  type="button"
                  lang={value}
                  aria-pressed={language === value}
                  onClick={() => selectLanguage(value)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-border px-3.5 py-3 text-left transition-colors hover:border-ring hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:border-ring aria-pressed:bg-muted"
                >
                  <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                    {badge}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{label}</span>
                    <span className="block text-sm text-muted-foreground">{description}</span>
                  </span>
                  {language === value && <Check size={18} aria-hidden="true" className="shrink-0 text-ring" />}
                </button>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="features-heading" className="mt-8 sm:mt-10">
          <h2 id="features-heading" className="mb-4 text-xl font-bold tracking-tight">What you can do</h2>
          <div className="grid gap-3 sm:grid-cols-3 lg:gap-5">
            {features.map(({ icon: Icon, title, description, color }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-5">
                <span className={`mb-3 flex size-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Front;
