"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/modules/fetch/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function Login() {
  useEffect(() => {
    // Mengambil data cookie
    const myCookieValue = Cookies.get("access_token");
    console.log(myCookieValue);
  }, []);
  const { push } = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const pass = event.target.elements.password.value;

    try {
      console.log(email);
      const response = await login(email, pass);
      console.log(response.data.status);
      if (response.data.status == "error") {
        toast.error("username or passoword wrong", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else {
        localStorage.setItem("token", response.data.data);
      }
      event.target.reset();

      toast.success("success Login", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      setTimeout(() => {
        push("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("username or passoword wrong", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }
  return (
    <div className="container mx-auto py-8">
      <form className="w-full max-w-sm mx-auto bg-gray-900 p-8 rounded-md shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-center text-white font-bold mb-3">LOGIN</h1>
        {/* <h2 className="text-md mb-6 text-center text-gray-400">Login</h2> */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="email" id="email" name="email" placeholder="john@example.com" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="password" id="password" name="password" placeholder="********" />
        </div>
        <div className="flex items-center justify-between my-5"></div>
        <button className="w-full bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300" type="submit">
          Login
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
