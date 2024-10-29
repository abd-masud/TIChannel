"use client";

import { useAuth } from "@/components/Frontend/Context/AuthContext";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      createPassword,
      confirmPassword,
    };

    try {
      const response = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { user: userData } = await response.json();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Logged in user data:", userData);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleCloseError = () => {
    setError("");
  };
  return (
    <main className="bg-auth_bg bg-cover bg-center bg-fixed w-screen h-screen">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute sm:top-[100px] top-[70px] left-5 z-50">
          <div className="text-sm font-medium">Password Not Matched</div>
          <button onClick={handleCloseError}>
            <FontAwesomeIcon className="ml-3 text-[14px]" icon={faXmark} />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h2 className="text-white font-[700] text-[20px] mb-5">
            Sign Up Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[14px] text-white" htmlFor="name">
                Your Name
              </label>
              <input
                placeholder="Enter your name"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300  mt-2"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-white" htmlFor="email">
                Email Address
              </label>
              <input
                placeholder="Enter email address"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300  mt-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-white"
                htmlFor="createPassword"
              >
                Create Password
              </label>
              <input
                placeholder="Enter password"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300  mt-2"
                type="password"
                id="createPassword"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-white"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                placeholder="Enter confirm password"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:right-0 focus:border-[#B9C1CC] rounded-md transition-all duration-300  mt-2"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input
              className="text-[14px] font-[500] bg-primary hover:bg-primary-mouse w-full py-2 rounded text-white cursor-pointer focus:bg-primary-mouse transition-all duration-300 "
              type="submit"
              value={"Sign Up"}
            />
            <p className="text-[14px] text-[#9B9B9B] font-[500] mt-4">
              Already have account?{" "}
              <Link
                className="text-red-600 ml-1"
                href={"/authentication/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};