"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { getAllTransaction } from "../modules/fetch/transaction";
import Image from "next/image";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [status, setStatus] = useState("");

  const [transactions, setTransaction] = useState();
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: products, error } = useSWR("https://api.escuelajs.co/api/v1/products", fetcher);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getAllTransaction(currentPage, status);
        console.log(response.data);
        setTransaction(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [currentPage, searchTerm, showModal, status, deleteModal]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const Tabs = () => {
    return (
      <>
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">
            Select your country
          </label>
          <select
            id="tabs"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Semua</option>
            <option>Belum Bayar</option>
            <option>Dikemas</option>
            <option>Dikirim</option>
            <option>Diterima</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>
        </div>
        <ul class="hidden text-sm font-medium text-center drop-shadow-md border border-gray-300 text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}  rounded-s-lg focus:outline-none dark:bg-gray-700 dark:text-white`}
              aria-current="page"
              onClick={() => setStatus("")}
            >
              Semua
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Belum Dibayar" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Belum Dibayar")}
            >
              Belum Bayar
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Sudah Dibayar" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Sudah Dibayar")}
            >
              Sudah Bayar
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Dikemas" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Dikemas")}
            >
              Dikemas
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Dikirim" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Dikirim")}
            >
              Dikirim
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Diterima" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Diterima")}
            >
              Diterima
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Selesai" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"}   focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Selesai")}
            >
              Selesai
              {/* <div className="flex flex-row gap-2 justify-center">
                <div>{"Selesai "}</div>
                <div class="flex w-5 h-5  justify-center text-white bg-red-700 rounded-full top-0 left-0">1</div>
              </div> */}
            </a>
          </li>

          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class={`inline-block w-full p-4 ${status === "Dibatalkan" ? "bg-gray-800  text-white" : "bg-white text-gray-800 hover:text-gray-700"} rounded-e-lg focus:outline-none dark:bg-gray-700 dark:text-white`}
              onClick={() => setStatus("Dibatalkan")}
            >
              Dibatalkan
            </a>
          </li>
        </ul>
      </>
    );
  };

  const TableFooter = ({ totalPages, handleChangePage, currentPage }) => {
    return (
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 space-x-2">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
          &nbsp;of
          <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <a
              href="#"
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handleChangePage(index + 1)}
                disabled={currentPage === index + 1}
                type="button"
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                  currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-white text-gray-500"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const Card = (item) => {
    return (
      <>
        <div class="w-full max-w-full bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class=" rounded-t-lg bg-gray-800  flex items-center justify-between p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 gap-2 ">
                <img class="w-8 h-8 rounded-full" src={item?.item?.user?.photo_url ? item?.item?.user?.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Neil image" />
              </div>
              <p class="text-lg font-medium px-3 text-white pe">{item?.item?.user?.name}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p class="text-lg font-medium  text-white pe-1">{item?.item?.transaction_status}</p>
              <p class="text-lg font-medium  text-white pe-1">|</p>
              <Link href={`/transactions/${item?.item?.id}`}>
                <button type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y p-4 divide-gray-200 dark:divide-gray-700">
              {item?.item?.transaction_details.map((item) => (
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
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="blur-lg">
      <div className={`mx-auto max-w-screen-xl p-5 lg:px-12 ${showModal ? "blur-lg" : ""}`}>
        <Tabs />
        {transactions?.data?.map((transaction) => (
          <div className="mt-4">
            <Card item={transaction} />
          </div>
        ))}
        <div className=" w-full rounded-lg bg-white border mt-3 shadow-md border-gray-400">
          <TableFooter totalPages={transactions?.pagination.totalPages} handleChangePage={handleChangePage} currentPage={currentPage} />
        </div>
      </div>
    </section>
  );
}
