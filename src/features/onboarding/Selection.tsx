import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTractor, FaUsersCog } from "react-icons/fa";

const Selection = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleRoleSelect = (role: string) => {
    navigate("/signup", { state: { role, phone: state?.phone } });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ef] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12">
        <section className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 shadow-sm">
            <img src="/logoo.png" alt="" className="h-10 w-10 object-contain" />
            <span className="text-sm font-bold tracking-wide text-emerald-950">
              Kisan Vyapaar
            </span>
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
            One platform, every role
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Grow together
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-600 lg:mx-0">
            Choose how you participate in the agricultural marketplace.
          </p>
        </section>

        <section
          aria-labelledby="role-heading"
          className="mx-auto w-full max-w-4xl rounded-3xl border border-white bg-white p-6 shadow-xl shadow-emerald-950/10 sm:p-9"
        >
          <p className="text-sm font-semibold text-emerald-700">Create your account</p>
          <h2
            id="role-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Select your role
          </h2>
          <p className="mt-2 text-sm text-slate-500">अपनी भूमिका चुनें</p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => handleRoleSelect("farmer")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 p-5 text-center transition hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <FaTractor size={30} aria-hidden="true" className="text-emerald-800" />
              <span className="mt-4 text-lg font-semibold">Farmer</span>
              <span className="mt-1 text-sm text-slate-500">किसान</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("buyer")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 p-5 text-center transition hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <FaShoppingCart size={30} aria-hidden="true" className="text-emerald-800" />
              <span className="mt-4 text-lg font-semibold">Buyer</span>
              <span className="mt-1 text-sm text-slate-500">खरीदार</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("fpo")}
              className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-slate-200 p-5 text-center transition hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <FaUsersCog size={30} aria-hidden="true" className="text-emerald-800" />
              <span className="mt-4 text-lg font-semibold">FPO</span>
              <span className="mt-1 text-sm text-slate-500">एफ़पीओ</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Selection;
