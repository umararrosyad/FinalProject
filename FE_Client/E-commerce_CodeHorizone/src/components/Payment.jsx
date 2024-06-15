import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Payment() {
  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Pembayaran</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w 3/4">
            <div className="bg-peach rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">
                Transfer Bank (Verifikasi Manual)
              </h2>
              <div className="flex items-center md:w 1/2">
                <Image
                  className="h-12 w-16 mr-4"
                  src="/images/logo-bca.png"
                  alt="Product image"
                  height={2400}
                  width={1500}
                />
                <span className="font-bold">Transfer Bank BCA</span>
              </div>
              <hr className="my-2" />
              <h2 className="text-lg font-semibold mb-4">E-Wallet</h2>
              <div className="flex items-center md:w 1/2">
                <Image
                  className="h-12 w-16 mr-4"
                  src="/images/logo-gopay.jpeg"
                  alt="Product image"
                  height={2400}
                  width={1500}
                />
                <span className="font-bold">Gopay</span>
              </div>
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <tbody>
                  <tr className="justify-between">
                    <td className="py-4">
                      <div className="flex items-center">
                        <h1 className="font-bold text-lg">Total Order</h1>
                      </div>
                    </td>
                    <td className="py-4 text-right text-lg font-bold">
                      Rp.262.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h1 className="text-lg font-bold">Transfer Bank BCA</h1>
              <hr className="w-full my-4" />
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center w-3/4">
                        <span className="font-semibold">
                          Berikut Nomor Rekening Admin <br />
                          0143000091 <br />
                          A/N PT. Tumbuh Kembang SiKecil
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center w-3/4">
                        <span>
                          Perhatian Lakukan Konfirmasi Dengan Upload Bukti
                          Pembayaran
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Link href="/paymentpage">
                        <button className="bg-primary text-white font-bold py-2 px-20 rounded-lg mt-4 w-full">
                          Upload Bukti Pembayaran
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
