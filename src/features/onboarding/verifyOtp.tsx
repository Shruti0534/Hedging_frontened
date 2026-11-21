import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { backendApiUrl } from "../../api/backendUrl";


const OTP = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const testOtp = state?.testOtp;
  const [otp, setOtp] = useState(testOtp ? String(testOtp) : "");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const autoVerifyStarted = useRef(false);
  const testOtpNoticeShown = useRef(false);

  const handleVerifyOtp = useCallback(async (code = otp) => {
    if (!phone || code.length !== 6 || isVerifying) return;

    setIsVerifying(true);
    try {
      const res = await axios.post(
        backendApiUrl("auth/verify-otp"),
        {
          phoneNumber: phone,
          otp: code,
        }
      );

      if (res.data.success === true) {
        if (res.data.token && res.data.user) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate(res.data.user.role === "buyer" ? "/buyer" : "/app/dashboard");
        } else {
          navigate("/selection", { state: { phone } });
        }
      } else {
        toast({
          title: res.data.message || "Invalid or expired OTP",
          variant: "destructive",
        });
        setIsVerifying(false);
      }
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      toast({
        title: message || "Error verifying OTP",
        variant: "destructive",
      });
      setIsVerifying(false);
    }
  }, [isVerifying, navigate, otp, phone, toast]);

  useEffect(() => {
    if (!phone) {
      navigate("/login", { replace: true });
      return;
    }

    if (testOtp && !testOtpNoticeShown.current) {
      testOtpNoticeShown.current = true;
      toast({
        title: "Test OTP received",
        description: `Your code is ${testOtp}.`,
      });
    }

    if (import.meta.env.DEV && testOtp) {
      if (!autoVerifyStarted.current) {
        const timer = window.setTimeout(() => {
          autoVerifyStarted.current = true;
          void handleVerifyOtp(String(testOtp));
        }, 0);
        return () => window.clearTimeout(timer);
      }
    }
  }, [testOtp, handleVerifyOtp, navigate, phone, toast]);

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
          <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Trade Seekho
            <span className="mt-2 block text-xl font-semibold text-slate-600 sm:text-2xl">
              Empowering Farmers, Connecting Markets
            </span>
          </h2>
        </section>

        <section
          aria-labelledby="verify-otp-heading"
          className="mx-auto w-full max-w-lg rounded-3xl border border-white bg-white p-6 shadow-xl shadow-emerald-950/10 sm:p-9"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>

          <p className="text-sm font-semibold text-emerald-700">Secure sign in</p>
          <h1
            id="verify-otp-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Verify OTP
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-slate-700">{phone}</span>.
          </p>

          {testOtp && (
            <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-center text-sm text-blue-800">
              Test OTP: <strong className="select-all">{testOtp}</strong>
            </p>
          )}

          <label
            htmlFor="otp-code"
            className="mb-2 mt-7 block text-sm font-semibold text-slate-700"
          >
            One-time password
          </label>
          <input
            id="otp-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-xl tracking-[0.45em] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
          />

          <button
            type="button"
            onClick={() => void handleVerifyOtp()}
            disabled={isVerifying || otp.length !== 6}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Change phone number
          </button>
        </section>
      </div>
    </main>
  );
};

export default OTP;
