"use client";

import { useState } from "react";
import Link from "next/link";

import { FaUser } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // If passwords match, you can submit to the backend
    // For now, comment out the backend logic
    // Example backend call:
    // const response = await fetch("/api/register", {
    //   method: "POST",
    //   body: JSON.stringify({ name, company, email, password }),
    //   headers: { "Content-Type": "application/json" },
    // });

    // Redirect to SignIn page after successful registration
    router.push("/ti-admin/authentication/sign-in");
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  return (
    <main className="min-h-screen">
      {errorMessage && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute top-5 right-5 z-50">
          <div className="text-sm font-medium">{errorMessage}</div>
          <button onClick={handleCloseError}>
            <FontAwesomeIcon className="ml-3 text-[14px]" icon={faXmark} />
          </button>
        </div>
      )}
      <div className="bg-[#F5F8FA] flex justify-center items-center h-screen sm:px-10 px-5">
        <div className="flex flex-col gap-7 bg-white shadow-lg sm:px-10 px-8 sm:py-10 py-8 w-[400px] border-2">
          <p className="text-black font-bold text-center text-[30px]">
            <span className="text-primary">TI</span> Channel
          </p>
          <form onSubmit={handleSubmit}>
            <label className="font-[500] text-[14px]" htmlFor="name">
              User Name
            </label>
            <div className="flex items-center mt-2 mb-5">
              <FaUser className="bg-white border-y border-l h-[55px] w-10 p-3 fill-[#9FA6B2]" />
              <input
                required
                id="name"
                placeholder="Enter user name"
                className="border-y border-r py-4 pr-4 focus:right-0 focus:outline-none w-full text-[14px]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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

            <label className="font-[500] text-[14px]" htmlFor="password">
              Password
            </label>
            <div className="flex items-center mt-2 mb-4">
              <FaLock className="bg-white border-y border-l h-[55px] w-10 p-3 fill-[#9FA6B2]" />
              <input
                required
                id="password"
                placeholder="Enter password"
                className="border-y border-r py-4 pr-4 focus:right-0 focus:outline-none w-full text-[14px]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="font-[500] text-[14px]" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="flex items-center mt-2 mb-4">
              <FaLock className="bg-white border-y border-l h-[55px] w-10 p-3 fill-[#9FA6B2]" />
              <input
                required
                id="confirmPassword"
                placeholder="Enter confirm password"
                className="border-y border-r py-4 pr-4 focus:right-0 focus:outline-none w-full text-[14px]"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* {errorMessage && (
              <p className="text-red-600 text-[12px] font-[500]">
                {errorMessage}
              </p>
            )} */}
            <input
              className="font-[600] text-white bg-primary py-3 w-full block mt-5 mb-4 cursor-pointer"
              type="submit"
              value={"Sign Up"}
            />
            <p className="text-[14px] font-[500] text-[#797C8B]">
              Already have an account?
              <Link
                className="ml-2 text-gray-800"
                href={"/ti-admin/authentication/sign-in"}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
