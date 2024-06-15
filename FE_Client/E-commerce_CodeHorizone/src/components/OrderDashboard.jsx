import { Radio } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getAllTransaction } from "@/modules/fetch/transaction_Copy";
import { useRouter } from "next/router";

export default function OrderDashboard() {
  const [status, setStatus] = useState();
  const router = useRouter();
  const [transactions, setTransaction] = useState();

  let user_id;

  if (typeof window !== "undefined") {
    user_id = window.localStorage.getItem("user_id");
  }

  const onTabClick = (stat) => {
    if (status == stat) {
      setStatus();
    } else {
      setStatus(stat);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllTransaction(user_id, status);
        setTransaction(response.data);
        console.log(response.data);
        console.log("transaction");
        console.log(transactions);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeedbacks();
  }, [status]);

  const Card = ({ item }) => {
    return (
      <div className="w-full border-2 border-primary rounded-md mt-5">
        <div className="w-full bg-primary p-2 px-4 flex flex-row item-center justify-between">
          <div className="text-md self-center text-white font-bold">No Pesanan #{item.id}</div>
          <div className="text-sm bg-white font-bold text-primary p-2 rounded-md">{item.transaction_status}</div>
        </div>
        <div className="w-full p-3">
          <ul role="list" class="divide-y p-4 divide-gray-200 dark:divide-gray-700">
            {item?.transaction_details.map((item) => (
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
          </ul>
          {/* <hr class="h-px mx-1 mb-5 mt-5 bg-gray-400 border-0 dark:bg-gray-700" /> */}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full ">
      <div className="bg-white border-2 border-primary rounded-lg shadow-md py-4 px-8">
        <h1 className="text-2xl mb-2 font-bold">Pesanan Saya</h1>
        <hr class="h-px bg-primary border-0 mb-5 dark:bg-gray-700" />
        <div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div
              class={`w-full md:px-6 py-3  ${status == "Belum Dibayar" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Belum Dibayar")}
            >
              <svg class={`w-8 h-8 ${status == "Belum Dibayar" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z"
                />
              </svg>
              <p className="text-sm mx-auto">Belum Bayar</p>
            </div>
            <div
              class={`w-full md:px-6 py-3  ${status == "Sudah Dibayar" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Sudah Dibayar")}
            >
              <svg class={`w-8 h-8 ${status == "Sudah Dibayar" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
              <p className="text-sm mx-auto">Sudah Bayar</p>
            </div>
            <div
              class={`w-full md:px-6 py-3  ${status == "Dikemas" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Dikemas")}
            >
              <svg class={`w-8 h-8 ${status == "Dikemas" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"
                />
              </svg>
              <p className="text-sm mx-auto">Dikemas</p>
            </div>
            <div
              class={`w-full md:px-6 py-3  ${status == "Dikirim" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Dikirim")}
            >
              <svg class={`w-8 h-8 ${status == "Dikirim" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
              <p className="text-sm mx-auto">Dikirim</p>
            </div>
            <div
              class={`w-full md:px-6 py-3  ${status == "Diterima" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Diterima")}
            >
              <svg class={`w-8 h-8 ${status == "Diterima" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M11 5.1a1 1 0 0 1 2 0l1.7 4c.1.4.4.6.8.6l4.5.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3 1l1 4a1 1 0 0 1-1.5 1.2l-3.9-2.3a1 1 0 0 0-1 0l-4 2.3a1 1 0 0 1-1.4-1.1l1-4.1c.1-.4 0-.8-.3-1l-3.3-2.8a1 1 0 0 1 .5-1.7l4.5-.4c.4 0 .7-.2.8-.6l1.8-4Z"
                />
              </svg>
              <p className="text-sm mx-auto">Penilaian</p>
            </div>
            <div
              class={`w-full md:px-6 py-3  ${status == "Selesai" ? "bg-primary border-gray-700 text-white" : "bg-white border-gray-200 hover:bg-gray-100"} flex flex-col item-center gap-1 border  rounded-lg shadow `}
              onClick={() => onTabClick("Selesai")}
            >
              <svg class={`w-8 h-8 ${status == "Selesai" ? "text-white" : "text-gray-800"} mx-auto  dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 6H8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h1c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Zm7 0h-1a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h1c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Z"
                />
              </svg>
              <p className="text-sm mx-auto">Selesai</p>
            </div>
          </div>
        </div>
      </div>
      {transactions?.map(
        (item) =>
          item.user_id == user_id && (
            <Link href={`/order/${item.id}`}>
              <Card item={item} />
            </Link>
          )
      )}
    </div>
  );
}
