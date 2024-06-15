import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SidebarMini from "@/components/SidebarMobile";
import Footer from "@/components/Footer";
import OrderDashboard from "@/components/OrderDashboard";

export default function orderpage() {
  return (
    <>
      <main className="bg-bgSecondary">
        <div>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className="flex min-h-screen  gap-6  mx-5 md:mx-10 pt-28 mb-10">
            <div className="hidden md:block">
              <Sidebar sideLocation={"pesanan"} />
            </div>
            {/* SidebarMini */}
            <div className="md:hidden">
              <SidebarMini />
            </div>
            <OrderDashboard />
          </div>
        </div>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
