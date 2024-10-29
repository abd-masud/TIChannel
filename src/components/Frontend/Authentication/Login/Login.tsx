"use client";

import { useAuth } from "@/components/Frontend/Context/AuthContext";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import google from "../../../../../public/images/google.svg";
import Image from "next/image";

// Import Google Sign-In functions (example: Firebase)
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Ensure Firebase is initialized in your project before using Firebase Auth.

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
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

  const handleGoogleSignIn = async () => {
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();

    try {
      // const result = await signInWithPopup(auth, provider);
      // const userData = result.user;
      // setUser(userData);
      // localStorage.setItem("user", JSON.stringify(userData));
      // console.log("Logged in with Google:", userData);
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setError("Google Sign-In failed. Please try again.");
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
          <div className="text-sm font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FontAwesomeIcon className="ml-3 text-[14px]" icon={faXmark} />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center w-screen h-[calc(100vh-85px)]">
        <div className="w-[500px] bg-[#66636342] backdrop-blur-lg sm:px-10 px-8 sm:py-14 py-12 mx-5">
          <h2 className="text-white font-[700] text-[20px] mb-5">Sign In</h2>
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full py-2 text-[14px] font-[500] bg-white hover:bg-gray-200 text-black rounded transition-all duration-300"
            >
              <Image src={google} alt="Google icon" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>
          <div>
            <p className="text-white text-[20px] font-[600] my-4 text-center">
              Or continue with email
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[14px] text-white" htmlFor="email">
                Email Address
              </label>
              <input
                placeholder="Enter email address"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:border-[#B9C1CC] rounded-md transition-all duration-300 mt-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-white" htmlFor="password">
                Password
              </label>
              <input
                placeholder="Enter password"
                className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:border-[#B9C1CC] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input className="mr-3" type="checkbox" id="remember" />
                <label className="text-[14px] text-white" htmlFor="remember">
                  Remember Me
                </label>
              </div>
              <Link
                className="text-[14px] text-red-600 font-[500]"
                href={"/authentication/forgot-password"}
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="text-[14px] font-[500] bg-primary hover:bg-primary-mouse w-full py-2 rounded text-white cursor-pointer focus:bg-primary-mouse transition-all duration-300"
              type="submit"
              value={"Sign In"}
            />
          </form>

          <p className="text-[14px] text-[#9B9B9B] font-[500] mt-4">
            Don&apos;t have an account?{" "}
            <Link
              className="text-red-600 ml-1"
              href={"/authentication/sign-up"}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
