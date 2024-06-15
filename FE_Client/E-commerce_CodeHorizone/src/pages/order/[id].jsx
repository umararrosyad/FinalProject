import React from "react";
import Navbar from "@/components/Navbar";
import TransationDetail from "@/components/transactionDetail";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function checkout() {
  return (
    <>
      <main className="bg-gray-100">
        <div>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className=" mx-10 mb-20 pt-28">
            <TransationDetail />
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
