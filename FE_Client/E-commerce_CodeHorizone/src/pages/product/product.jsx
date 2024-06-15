import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductDetail from '@/components/ProductDetail'
import ReviewSection from '@/components/ReviewSection'
import UserReviews from '@/components/UserReviews'
import ProductCard from '@/components/ProductCard'

export default function productdetail() {
  return (
    <>
      <main className="bg-white">
        <section>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </section>
        <section>
          <div className="container flex space-x-3 mx-auto pt-28">
            <ProductDetail></ProductDetail>
          </div>
        </section>
        <section>
          <div className="container flex space-x-3 mx-auto mb-20">
            <ReviewSection />
          </div>
        </section>
        <section>
          <div className="container flex space-x-3 mx-auto">
            <UserReviews />
          </div>
        </section>
        <h1 className="mx-auto ml-72 text-2xl font-bold mb-9">Produk Serupa</h1>
        <section className="container mx-auto mb-20">
          <ProductCard />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  )
}
