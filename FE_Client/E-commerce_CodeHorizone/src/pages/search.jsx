import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchProduct from "@/components/SearchProduct";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";

export default function searchresult() {
  return (
    <>
      <main className="bg-gray-50">
        <div>
          <div className="">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className=" flex space-x-3 mx-10 mb-5 pt-28 gap-3">
            <FilterBar />
            {/* <div className="">
            </div> */}
            <SearchProduct />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}
