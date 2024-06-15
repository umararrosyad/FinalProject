import React from 'react'
import Navbar from '@/components/Navbar'
import Payment from '@/components/Payment'
import Footer from '@/components/Footer'

export default function paymentpage() {
  return (
    <>
      <main className="bg-bgSecondary">
        <section>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </section>
        <section>
          <div className="container mx-auto pt-48">
            <Payment />
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  )
}
