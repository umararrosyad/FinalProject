"use client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import Tabs from "@/components/tabsProductsCreate";
import Form from "@/components/formProductsCreate";

import { useRouter } from "next/router";

export default function DashboardSidebarLayout({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);

  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <div className=" sm:mx-14 mt-24">
        <div class="md:flex">
          <Tabs />
          <Form />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
