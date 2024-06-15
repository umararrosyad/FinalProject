import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ReviewForm from '@/components/ReviewForm'
import Footer from '@/components/Footer'

export default function reviewinputpage() {
  return (
    <>
      <main className="bg-bgSecondary">
        <section>
          <div className="container">
            <Navbar></Navbar>
          </div>
        </section>
        <section>
          <div className="container flex space-x-3 mx-auto pt-48 mb-64">
            <Sidebar />
            <ReviewForm />
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  )
}
