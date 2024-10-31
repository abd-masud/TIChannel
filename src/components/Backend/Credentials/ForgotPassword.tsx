"use client";

import { useState } from "react";
import Link from "next/link";

import { FaAt } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Log form data to console (for now)
    console.log({
      email,
    });

    // Redirect to the home page after successful submission
    router.push("/ti-admin/authentication/new-password");
  };

  return (
    <main className="min-h-screen">
      <div className="bg-[#F5F8FA] flex justify-center items-center h-screen sm:px-10 px-5">
        <div className="flex flex-col gap-7 bg-white shadow-lg sm:px-10 px-8 sm:py-10 py-8 w-[400px] border-2">
          <p className="text-black font-bold text-center text-[30px] inline-block">
            <Link href={"/"}>
              <span className="text-primary">TI</span> Channel
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <label className="font-[500] text-[14px]" htmlFor="email">
              Email
            </label>
            <div className="flex items-center mt-2 mb-5">
              <FaAt className="bg-white border-y border-l h-[55px] w-10 p-3 fill-[#9FA6B2]" />
              <input
                required
                id="email"
                placeholder="Enter email address"
                className="border-y border-r py-4 pr-4 focus:right-0 focus:outline-none w-full text-[14px]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              className="font-[600] text-white bg-primary py-3 w-full block mt-7 mb-4 cursor-pointer"
              type="submit"
              value={"Send verification code"}
            />
            <Link
              className="text-gray-600 text-[14px] font-[500]"
              href={"/ti-admin/authentication/sign-in"}
            >
              <FaAngleLeft className="mr-2 inline-block mb-[3px]" />
              Back
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};
