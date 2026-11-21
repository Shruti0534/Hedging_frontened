import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "../../hooks/use-toast";
import { backendApiUrl } from "../../api/backendUrl";

const PhoneLogin = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = async () => {
    const formattedPhone = phone.replace(/ /g, "");

    if (formattedPhone.length < 10) {
      toast({
        title: t("Please enter a valid phone number"),
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const res = await axios.post(
        backendApiUrl("auth/send-otp"),
        { phoneNumber: formattedPhone }
      );

      if (res.data.success) {
        window.setTimeout(() => {
          navigate("/otp", {
            state: {
              phone: formattedPhone,
              testOtp: res.data.testOtp,
            },
          });
        }, 3000);
      } else {
        toast({
          title: res.data.message || t("Something went wrong while sending OTP"),
          variant: "destructive",
        });
        setIsSending(false);
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      toast({
        title: message || t("Something went wrong while sending OTP"),
        variant: "destructive",
      });
      setIsSending(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ef] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-16 lg:px-12">
        <section className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 shadow-sm">
            <img src="/logoo.png" alt="" className="h-10 w-10 object-contain" />
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
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Trade Seekho
            <span className="mt-2 block text-xl font-semibold text-slate-600 sm:text-2xl">
              Empowering Farmers, Connecting Markets
            </span>
          </h1>
        </section>

        <section
          aria-labelledby="phone-login-heading"
          className="mx-auto w-full max-w-lg rounded-3xl border border-white bg-white p-6 shadow-xl shadow-emerald-950/10 sm:p-9"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <Phone size={23} aria-hidden="true" />
          </div>

          <p className="text-sm font-semibold text-emerald-700">Welcome back</p>
          <h2
            id="phone-login-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Sign in with phone
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Use the phone number linked to your account to continue.
          </p>

          <label
            htmlFor="phone-number"
            className="mb-2 mt-7 block text-sm font-semibold text-slate-700"
          >
            {t("Phone number")}
          </label>
          <PhoneInput
            country="in"
            value={phone}
            onChange={setPhone}
            inputProps={{
              id: "phone-number",
              name: "phone",
              autoComplete: "tel",
              required: true,
            }}
            containerStyle={{ width: "100%" }}
            inputStyle={{
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#fff",
            }}
            buttonStyle={{
              borderRadius: "12px 0 0 12px",
              border: "1px solid #cbd5e1",
            }}
          />

          <button
            type="button"
            onClick={() => void handleSendOtp()}
            disabled={isSending}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Sending OTP..." : "Continue"}
            {!isSending && <ArrowRight size={18} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Change language
          </button>
        </section>
      </div>
    </main>
  );
};

export default PhoneLogin;
