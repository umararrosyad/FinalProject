import React from "react";
import Navbar from "@/components/Navbar";
import CartPage from "@/components/CartPage";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function cart() {
  return (
    <>
      <main className="bg-gray-100">
        <div>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className=" mx-10 min-h-screen mb-20 pt-28">
            <CartPage />
          </div>
        </div>
        <div>
          <Footer />
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </main>
    </>
  );
}
