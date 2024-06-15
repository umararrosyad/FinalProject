"use client";
import Navbar from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";
import Sidebar from "@/components/Sidebar";
import SidebarMini from "@/components/SidebarMobile";
import Footer from "@/components/Footer";
import { getUser } from "@/modules/fetch/user";
import React, { useEffect, useState } from "react";

export default function accountpage() {
  return (
    <>
      <main className="bg-bgSecondary">
        <div>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className="flex min-h-screen gap-6  mx-5 md:mx-10 pt-28 mb-10">
            <div className="hidden md:block">
              <Sidebar sideLocation={"profil"} />
            </div>
            {/* SidebarMini */}
            <div className="md:hidden">
              <SidebarMini />
            </div>
            <ProfileForm sideLocation={"profil"} />
          </div>
        </div>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
