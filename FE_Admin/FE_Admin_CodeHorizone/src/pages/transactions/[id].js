"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getOneTransaction, updateTransaction } from "@/modules/fetch/transaction";
import { sendVerification } from "@/modules/fetch/email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

import { useRouter } from "next/router";

export default function DashboardSidebarLayout() {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { id } = router.query;
  const [transaction, setTransaction] = useState();
  const [status, setStatus] = useState();

  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(id);
        const response = await getOneTransaction(id);
        console.log(response.data);
        setTransaction(response.data);
        setStatus(response.data.transaction_status);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [status, id]);

  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  async function handleClick(item_status) {
    if (item_status == "Dibatalkan") {
      const response = await updateTransaction(id, item_status);
      setStatus(item_status);
      toats("success", "Pesanan Dibatalkan");
    } else if (item_status == "Dikemas") {
      const response = await updateTransaction(id, item_status);
      setStatus(item_status);
      toats("success", "Pembayaran Dikonfirmasi");
      let product = "";
      transaction?.transaction_details.map((item) => {
        product += `${item?.product_variant?.product?.name}[${item?.product_variant?.product_type?.type_name} | ${item?.product_variant?.product_size?.size_name}] x${item?.qty}, `;
      });
      const data = {
        service_id: "service_zikzc15",
        template_id: "template_ot01ewb",
        user_id: "VbfJ1FDMopn7GXFvi",
        template_params: {
          name: transaction?.user?.name,
          send_to: transaction?.user?.email,
          product_price: `Rp.${transaction?.product_price.toLocaleString("id-ID")}` ,
          shipping_price: `Rp.${transaction?.shipping_price.toLocaleString("id-ID")}`,
          total_payment: `Rp.${transaction?.total_price.toLocaleString("id-ID")}`,
          product: product
        }
      };
      await sendVerification(data);
    } else if (item_status == "Dikirim") {
      const response = await updateTransaction(id, item_status);
      setStatus(item_status);
      toats("success", "Pesanan Dikirim");
    } else if (item_status == "Diterima") {
      let product = "";
      transaction?.transaction_details.map((item) => {
        product += `${item?.product_variant?.product?.name}[${item?.product_variant?.product_type?.type_name} | ${item?.product_variant?.product_size?.size_name}] x${item?.qty}, `;
      });
      const data = {
        service_id: "service_zikzc15",
        template_id: "template_dsbpa88",
        user_id: "VbfJ1FDMopn7GXFvi",
        template_params: {
          send_to: transaction?.user?.email
        }
      };
      await sendVerification(data);
      toats("success", "Email Telah Terkirim");
    }
  }

  function toats(status, pesan) {
    if (status == "success") {
      toast.success(pesan, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } else {
      toast.error(pesan, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }
  const Card = () => {
    return (
      <>
        <div class="bg-white border shadow-lg border-gray-300 rounded-lg mb-5 dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-800 flex items-center justify-between px-10 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 gap-2 ">
                <img class="w-8 h-8 rounded-full" src={transaction?.user?.photo_url ? transaction?.user?.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Neil image" />
              </div>
              <p class="text-lg font-medium ps-5 text-white truncate dark:text-white">{transaction?.user?.username}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p class="text-lg font-medium  text-white truncate dark:text-white pe-1">No Pesanan #{transaction?.id}</p>
              <p class="text-lg font-medium  text-white truncate dark:text-white pe-1">|</p>
              <p class="text-lg font-medium  text-white truncate dark:text-white pe-1">{transaction?.transaction_status}</p>
            </div>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y my-4 px-10 divide-gray-200 dark:divide-gray-700">
              {transaction?.transaction_details?.map((item) => (
                <li class="py-3 sm:py-4">
                  <div class="flex ">
                    <div class="flex-shrink-0">
                      <img class="w-20 h-20 object-cover shadow-lg border border-gray-300" src={item?.product_variant?.product_type?.photo_url} alt="Neil image" />
                    </div>
                    <div class="flex flex-col mt-2 w-full min-w-0">
                      <p class="text-md font-medium ps-5 text-gray-900 truncate dark:text-white">{item?.product_variant?.product?.name}</p>
                      <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">
                        Variant : {item?.product_variant?.product_type?.type_name}, {item?.product_variant?.product_size?.size_name}
                      </p>
                      <p class="text-sm ps-5 text-gray-500 truncate dark:text-gray-400">x{item?.qty}</p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item?.price && `Rp.${item.price.toLocaleString("id-ID")}`}</div>
                  </div>
                </li>
              ))}
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Total :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.product_price && `Rp.${transaction?.product_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Shipping price :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.shipping_price && `Rp.${transaction?.shipping_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex ">
                  <div class="flex flex-col mt-2 w-full min-w-0">
                    <p class="text-sm font-medium ps-5 text-gray-700 truncate dark:text-white">Total Payment :</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{transaction?.total_price && `Rp.${transaction?.total_price?.toLocaleString("id-ID")}`}</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex mt-5  justify-end ">
                  {transaction?.transaction_status == "Belum Dibayar" && (
                    <button
                      type="button"
                      onClick={() => handleClick("Dibatalkan")}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Batalkan Pemesanan
                    </button>
                  )}
                  {transaction?.transaction_status == "Sudah Dibayar" && (
                    <>
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => handleClick("Dibatalkan")}
                      >
                        Batalkan Pemesanan
                      </button>
                      <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => handleClick("Dikemas")}
                      >
                        Konfirmasi Pembayaran
                      </button>
                    </>
                  )}
                  {transaction?.transaction_status == "Dikemas" && (
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleClick("Dikirim")}
                    >
                      Kirim Pesanan
                    </button>
                  )}
                  {transaction?.transaction_status == "Diterima" && (
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleClick("Diterima")}
                    >
                      Minta Feedback
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className=" w-full justify-center"></div>
        </div>
      </>
    );
  };

  const CardAddress = () => {
    return (
      <>
        <div class="w-full bg-gray-800 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5">
          <h2 class="text-lg font-semibold text-white dark:text-white mb-2">Shipping Address</h2>
          <address class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
            <div class="space-y-2 text-gray-800 dark:text-gray-400 leading-loose hidden sm:block">
              Address <br />
              City <br />
              Province
            </div>
            <div id="contact-details" class="space-y-2 text-gray-900 dark:text-white font-medium leading-loose">
              {transaction?.address?.address} <br />
              {transaction?.address?.city?.city_name} <br />
              {transaction?.address?.province?.province_name}
            </div>
            <button
              data-copy-to-clipboard-target="contact-details"
              data-copy-to-clipboard-content-type="textContent"
              data-tooltip-target="tooltip-contact-details"
              class="absolute end-2 top-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
            ></button>
            <div
              id="tooltip-contact-details"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              <span id="default-tooltip-message-contact-details">Copy to clipboard</span>
              <span id="success-tooltip-message-contact-details" class="hidden">
                Copied!
              </span>
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </address>
        </div>
      </>
    );
  };

  const CardPhoto = () => {
    return (
      <>
        <div class="w-full max-w-full bg-white border shadow-lg border-gray-300 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-800  flex items-center justify-center px-10 py-4">
            <div class="justify-center">
              <p class="text-md font-medium justify-center text-white truncate dark:text-white pe-1">Bukti Pembayaran</p>
            </div>
          </div>
          <div class="flow-root w-full justify-center">
            <div class="p-5">
              {transaction?.payment_photo_url ? (
                <img class="w-full h-auto object-cover shadow-lg border border-gray-300" src={transaction?.payment_photo_url} alt="Neil image" />
              ) : (
                <p class="text-md font-medium justify-center text-gray-500 truncate dark:text-white pe-1">Belum Ada Bukti Pembayaran</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className=" mx-10 mt-24 mb-5">
        <div className="flex md:flex-row flex-col gap-5">
          <div className="w-full">
            <Card />
            {transaction?.payment_photo_url && <CardAddress />}
          </div>
          <div className=" flex flex-col w-full gap-4 mb-6">
            {!transaction?.payment_photo_url ? (
              <>
                <CardAddress />
              </>
            ) : (
              <CardPhoto />
            )}
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    </div>
  );
}
