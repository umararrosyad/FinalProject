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

import Tabs from "@/components/tabsProducts";
import FormProduct from "@/components/formProducts";
import FormGalleries from "@/components/formGalleries";
import FormTypes from "@/components/formTypes";
import FormSizes from "@/components/formSizes";
import FormVariant from "@/components/formVariant";

import { useRouter } from "next/router";
import { setProductLocation } from "@/store/reducers/sideLocation";

export default function DashboardSidebarLayout({ children }) {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.productLocation);
  let mainContent;
  if (location === "product") {
    mainContent = <FormProduct />;
  } else if (location === "galleries") {
    mainContent = <FormGalleries />;
  } else if (location === "types") {
    mainContent = <FormTypes />;
  } else if (location === "sizes") {
    mainContent = <FormSizes />;
  } else if (location === "variant") {
    mainContent = <FormVariant />;
  }
  useEffect(() => {
    setActiveLink(pathname);
    dispatch(setProductLocation("product"));
    initFlowbite();
  }, [pathname]);

  return (
    <div>
      <Navbar />
      <div className=" sm:mx-14 mt-24">
        <div class="md:flex">
          <Tabs />
          {mainContent}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
