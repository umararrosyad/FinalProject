import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export default function NavbarBottom() {
  return (
    <div className="flex justify-center mb-4">
      <ul className="flex space-x-20">
        <li>
          <Link
            href="/product/productdetail"
            className="flex items-center text-white "
          >
            Filter <IoIosArrowDown />
          </Link>
        </li>
        <li>
          <Link href="/product/searchresult" className="text-white">
            Produk terbaru
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white">
            Costumer Service
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white">
            Tentang Kami
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white">
            Review Produk
          </Link>
        </li>
      </ul>
    </div>
  )
}
