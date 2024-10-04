/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Swal from "sweetalert2"; // Import SweetAlert

import { auth } from "@/app/firebase/config"; // Make sure the path is correct
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Try signing in first
      const userCredential = await signInWithEmailAndPassword(email, password);

      // Store user session or redirect after successful login
      if (userCredential) {
        sessionStorage.setItem("LoggedIn", "true"); // Use JSON.stringify
        console.log("User logged in:", email);

        // Show SweetAlert confirmation
        Swal.fire({
          title: "Logged in Successfully!",
          text: `Welcome, ${email}!`,
          icon: "success",
          confirmButtonText: "Go to Users",
        }).then(() => {
          // After closing the alert, navigate to the users page
          router.push("/dashboard/users");
        });
      }
    } catch (err) {
      console.error(err);
      let errorMessage = "An error occurred. Please try again.";

      // Check if the error is a FirebaseError
      if (err instanceof Error) {
        errorMessage = err.message; // Get the error message from the caught error
      }

      // Handle error (e.g., show a message to the user)
      Swal.fire({
        title: "Login Failed!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Video Section, completely hidden on mobile */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <Image
          src="/assets/login-banner.jpg" // Ensure the image path is correct
          alt="Vitar Logo"
          layout="fill" // This ensures the image covers the entire container
          objectFit="cover" // Ensures the image covers the area without being distorted
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white text-black">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/vitar-logo.png" // Ensure the logo path is correct
              alt="Vitar Logo"
              width={200}
              height={80}
              priority
            />
          </div>

          {/* Login Form */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your email"
                required // Add required attribute
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-red-500"
                placeholder="Enter your password"
                required // Add required attribute
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <a href="#" className="text-sm text-red-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            {error && (
              <p className="text-red-600 text-center mt-4">{error.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
