import React from 'react'
import Image from 'next/image'
import { Rating, Timeline } from '@material-tailwind/react'

export default function UserReviews() {
  return (
    <section className="flex w-full bg-white">
      <div className="flex justify-start space-x-9">
        <div className="w-15 h-1">
          <Image
            class="me-4 rounded-full"
            src="/images/profile.jpg"
            alt=""
            width={60}
            height={60}
          />
        </div>
        <div className="flex flex-col mb-9">
          <h2 className="text-lg font-semibold">UserName</h2>
          <Rating value={5} />
          <span>Time-stamp | Variasi: L/Merah</span>
          <div className="flex flex-col mt-9">
            <span>Qualitas: Mantap banget</span>
            <span>Cocok Untuk: Cocok untuk bayi</span>
            <span>Harga: Price to value</span>
          </div>
          <div className="flex flex-colmt-9 w-/3/4">
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industries standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </span>
          </div>
          <div className="flex justify-start space-x-5 mb-10">
            <Image
              src="/images/product_1.png"
              alt=""
              width={100}
              height={100}
            />
            <Image
              src="/images/product_1.png"
              alt=""
              width={100}
              height={100}
            />
            <Image
              src="/images/product_1.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
