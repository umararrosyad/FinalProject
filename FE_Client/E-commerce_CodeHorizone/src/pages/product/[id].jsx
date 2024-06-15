import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import ReviewSection from "@/components/ReviewSection";
import UserReviews from "@/components/UserReviews";
import ProductCard from "@/components/ProductCard";
import { getOneProducts } from "@/modules/fetch/products";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function productdetail() {
  const router = useRouter();
  const { id } = router.query;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const dataProductDetail = await getOneProducts(id);
          console.log("response", dataProductDetail.data.product_galleries[0]);
          setProductDetail(dataProductDetail.data);
          if (typeof window !== "undefined") {
            localStorage.setItem("productDetail", JSON.stringify(dataProductDetail));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <main className="bg-gray-50">
        <div>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </div>
        <div>
          <div className=" flex md:mx-10 mx-5 pt-28">{productDetail && productDetail.product_galleries && <ProductDetail productDetail={productDetail} />}</div>
        </div>
        {/* <section>
          <div className="container flex space-x-3 mx-auto mb-20">
            <ReviewSection />
          </div>
        </section> */}
        {/* <section>
          <div className="container flex space-x-3 mx-auto">
            <UserReviews />
          </div>
        </section>
        <h1 className="mx-auto ml-72 text-2xl font-bold mb-9">Produk Serupa</h1>
        <section className="container mx-auto mb-20">
          <ProductCard />
        </section> */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}
