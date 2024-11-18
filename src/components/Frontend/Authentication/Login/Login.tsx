"use client";

import { useAuth } from "@/components/Frontend/Context/AuthContext";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import google from "../../../../../public/images/google.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  // Handle the login form submission
  // Handle the login form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        localStorage.setItem("email", userData.email); // Store the email as well
        console.log("Logged in user data:", userData);

        setEmail("");
        setPassword("");

        router.push("/");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Logged in with Google:", userData);
      router.push("/");
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setError("Google Sign-In failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Close error message
  const handleCloseError = () => {
    setError("");
  };

  // Handle invalid user data from localStorage
  const handleInvalidUserData = () => {
    try {
      const storedUserData = localStorage.getItem("user");

      // Ensure data exists and is valid
      if (storedUserData) {
        const parsedUserData: User = JSON.parse(storedUserData);

        if (
          parsedUserData &&
          parsedUserData.id &&
          parsedUserData.email &&
          parsedUserData.name
        ) {
          setUser(parsedUserData);
        } else {
          throw new Error("Invalid user data in localStorage");
        }
      }
    } catch (error) {
      console.error("Invalid user data:", error);
      // Optionally log the user out or clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setError("Session expired. Please log in again.");
    }
  };

  // Ensure the user data is validated on load
  React.useEffect(() => {
    handleInvalidUserData();
  }, []);

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
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <Image
                    src={google}
                    alt="Google icon"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </>
              )}
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
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-white" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  placeholder="Enter password"
                  className="border text-[14px] text-white py-3 px-[10px] w-full bg-transparent hover:border-[#B9C1CC] focus:outline-none focus:border-[#B9C1CC] rounded-md transition-all duration-300 mt-2"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-6 text-white"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
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
