import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Rating } from '@material-tailwind/react'
import { Input } from '@material-tailwind/react'
import { Textarea } from '@material-tailwind/react'

export default function ReviewForm() {
  return (
    <div className="md:w-4/5 ">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-lg font-bold">Vendi Kaya</h1>
        <div>
          <nav className="w-1/3 mt-4">
            <ul className="flex space-x-10">
              <Link href="/reviewpage">
                <li className="text-lg font-semibold hover:bg-grape">
                  Tulis Review
                </li>
              </Link>
              <Link href="/reviewinputpage">
                <li className="text-lg font-semibold hover:bg-grape">
                  Review Saya
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <hr className="w-full mb-8" />
        <div className="flex flex-col rounded-xl">
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Image
                        className="mr-4"
                        src="/images/product_2.png"
                        alt="Product image"
                        height={150}
                        width={150}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg">Glassby</span>
                        <span className="font-regular text-lg">Gelas Imut</span>
                        <span className="font-regular text-lg">Size: M</span>
                        <span className="font-regular text-lg">
                          Warna: Peach, Jumlah: 1x
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex ">
              <h1 className="mr-5">Rating Produk</h1>
              <Rating value={4} />
            </div>
            <div className="w-full border rounded-lg mt-9">
              <div className="p-8">
                <h1 className="text-lg">Kualitas</h1>
                <div className="w-full mb-8">
                  <Input label="Bagaimana Kualitas Produkmu?" />
                </div>
                <h1 className="text-lg">Cocok Untuk</h1>
                <div className="w-full mb-8">
                  <Input label="Produkmu Cocok Untuk Apa Saja?" />
                </div>
                <h1 className="text-lg">Kesesuaian</h1>
                <div className="w-full mb-8">
                  <Input label="Produkmu Sesuai Dengan Foto Display?" />
                </div>
                <h1 className="text-lg">
                  Bagikan penilaianmu tentang produk ini
                </h1>
                <div className="w-full">
                  <Textarea label="Message" />
                </div>
                <div className="flex w-full mt-9">
                  <label
                    for="uploadFile1"
                    className="bg-white text-black text-base rounded w-40 h-26 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 mb-2 fill-black"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000"
                      />
                      <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000"
                      />
                    </svg>
                    Upload file
                    <input type="file" id="uploadFile1" className="hidden" />
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG SVG, WEBP, and GIF are Allowed.
                    </p>
                  </label>
                </div>
                <div className="flex justify-end space-x-4">
                  <Link href="/reviewinputpage">
                    <button className="bg-primary text-white font-bold py-2 px-9 rounded-lg ">
                      Kirim
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
