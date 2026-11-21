import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import MobileFrame from "../../components/layout/MobileFrame";
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
    <MobileFrame>
      <div className="w-full h-[100dvh] bg-white flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-[30px] p-6 shadow-xl border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Sign in with phone
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Use this option for an account already linked to a phone number.
          </p>

          <label className="text-sm font-semibold text-gray-700">
            {t("Phone number")}
          </label>
          <div className="mt-2">
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: "100%",
                borderRadius: "12px",
                height: "45px",
              }}
              buttonStyle={{
                borderRadius: "12px 0 0 12px",
              }}
            />
          </div>

          <button
            onClick={handleSendOtp}
            disabled={isSending}
            className="w-full mt-5 py-3 bg-black hover:bg-background hover:text-black text-white rounded-xl shadow-md active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Sending OTP..." : "Continue"}
          </button>

        </div>
      </div>
    </MobileFrame>
  );
};

export default PhoneLogin;
