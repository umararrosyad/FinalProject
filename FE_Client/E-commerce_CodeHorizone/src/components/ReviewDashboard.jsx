import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function ReviewDashboard() {
  return (
    <div className="md:w-4/5 ">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-lg font-bold">Review Saya</h1>
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
                  <td className="py-4 px-4">
                    <div className="text-right flex flex-col">
                      <span className="text-lg font-bold text-right">
                        Harga Satuan: Rp.250.000
                      </span>
                      <span className="text-lg font-bold text-right">
                        Ongkir: Rp.24.000
                      </span>
                      <span className="text-lg font-bold text-right">
                        Total: Rp.274.000
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="py-4 px-4">
              <div className="flex justify-end">
                <span className="text-lg font-regular">
                  Segera Nilai Produk
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-end space-x-4">
                  <Link href="/reviewinputpage">
                    <button className="bg-primary text-white font-bold py-2 px-9 rounded-lg ">
                      Tulis Review
                    </button>
                  </Link>
                </div>
                <hr className="mt-9 mb-9" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
