"use client";

// import { useAuth } from "@/components/Context/AuthContext";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const OTPPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleOtpSubmit(newOtp.join(""));
    }
  };

  const handleCloseError = () => setError(false);

  const handleOtpSubmit = (enteredOtp: string) => {
    const correctOtp = "123456";

    if (enteredOtp !== correctOtp) {
      setError(true);
    } else {
      router.push("/authentication/new-password");
      setError(false);
    }
  };

  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed w-screen h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute sm:top-[100px] top-[70px] left-5 z-50">
          <div className="text-sm font-medium">Invalid OTP</div>
          <button onClick={handleCloseError}>
            <FontAwesomeIcon className="ml-3 text-[14px]" icon={faXmark} />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h2 className="text-white font-[700] text-[20px] mb-5">
            Verify Email Address
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="text-[14px] text-white" htmlFor="otp">
              Enter OTP
            </label>
            <div className="border border-[#45484d] bg-black bg-opacity-30 rounded p-5 mt-2">
              <div className="flex justify-between py-2">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="sm:w-12 w-8 sm:h-12 h-8 text-center font-[600] border rounded border-[#B9C1CC] text-white bg-transparent focus:outline-none focus:border-red-600 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
            <p className="text-[14px] text-[#9B9B9B] font-[500] mt-4">
              Didn&apos;t receive any code?{" "}
              <Link className="text-red-600 ml-1" href={"#"}>
                RESEND CODE
              </Link>
            </p>
            <p className="text-[14px] text-[#9B9B9B] font-[500] mt-4">
              <Link
                className="text-red-600 inline-flex items-center"
                href={"/authentication/forgot-password"}
              >
                <FontAwesomeIcon
                  className="h-3 w-3 mr-2 mt-[2px]"
                  icon={faAngleLeft}
                />
                Back
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
