import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import MobileFrame from "../../components/layout/MobileFrame";
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
    <MobileFrame>

    <div className="w-full h-full bg-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200">
        
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
          Verify OTP
        </h1>
        <p className="mb-5 text-center text-sm text-gray-600">
          Enter the 6-digit code sent to your phone.
        </p>

        {testOtp && (
          <p className="mb-4 rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-800">
            Test OTP: <strong className="select-all">{testOtp}</strong>
          </p>
        )}

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-lg tracking-widest text-center"
        />

        <button
          onClick={() => void handleVerifyOtp()}
          disabled={isVerifying || otp.length !== 6}
          className="w-full mt-5 py-3 bg-black hover:bg-background hover:text-black text-white rounded-xl shadow-md active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>

      </div>
    </div>
    </MobileFrame>
  );
};

export default OTP;
