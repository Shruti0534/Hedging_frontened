import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTractor, FaUsersCog } from "react-icons/fa";

const Selection = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleRoleSelect = (role: string) => {
    navigate("/signup", { state: { role, phone: state?.phone } });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-gold/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12">
        <section className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/10 bg-card/80 px-4 py-2 shadow-sm">
            <img src="/logoo.png" alt="" className="h-10 w-10 object-contain" />
            <span className="text-sm font-bold tracking-wide text-foreground">
              Kisan Vyapaar
            </span>
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-accent-foreground">
            One platform, every role
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Grow together
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-muted-foreground lg:mx-0">
            Choose how you participate in the agricultural marketplace.
          </p>
        </section>

        <section
          aria-labelledby="role-heading"
          className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/10 sm:p-9"
        >
          <p className="text-sm font-semibold text-accent-foreground">Create your account</p>
          <h2
            id="role-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Select your role
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">अपनी भूमिका चुनें</p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => handleRoleSelect("farmer")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-border p-5 text-center transition hover:border-ring hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FaTractor size={30} aria-hidden="true" className="text-accent-foreground" />
              <span className="mt-4 text-lg font-semibold">Farmer</span>
              <span className="mt-1 text-sm text-muted-foreground">किसान</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("buyer")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-border p-5 text-center transition hover:border-ring hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FaShoppingCart size={30} aria-hidden="true" className="text-accent-foreground" />
              <span className="mt-4 text-lg font-semibold">Buyer</span>
              <span className="mt-1 text-sm text-muted-foreground">खरीदार</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("fpo")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-border p-5 text-center transition hover:border-ring hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FaUsersCog size={30} aria-hidden="true" className="text-accent-foreground" />
              <span className="mt-4 text-lg font-semibold">FPO</span>
              <span className="mt-1 text-sm text-muted-foreground">एफ़पीओ</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Selection;
