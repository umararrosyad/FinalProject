import React from "react";
import { Rating } from "@material-tailwind/react";
import Link from "next/link";

export default function ReviewSection() {
  return (
    <section className="w-full bg-white ">
      <div className="bg-peach">
        <h className="text-xl font-bold">Reviews & Ratings</h>
        <div className="items-center pb-7">
          <ul className="flex justify-between items-center">
            <li>
              <div className="flex items-center pt-2">
                <Rating value={4} />
                <span className="text-lg">(4.0)</span>
              </div>
              <span className="text-sm pt-1">27 Costumer Review</span>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white">Semua</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white rounded-md">Bintang 5</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white rounded-md">Bintang 4</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white rounded-md">Bintang 3</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white rounded-md">Bintang 2</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="py-2 px-2 bg-primary text-white rounded-md">Bintang 1</h1>
              </div>
            </li>
            <li>
              <div>
                <h1 className="text-lg font-bold">Have you tried this product? </h1>
                <span>Puas dengan produk yang kamu beli? Bagikan reviewmu</span>
                <Link href="/checkout">
                  <button className="bg-primary text-white font-bold py-2 px-4 rounded-full mt-4 w-4/5">Add review</button>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
