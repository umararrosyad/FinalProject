"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { getAllUsers } from "../modules/fetch/user";
import Image from "next/image";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  const [users, setUsers] = useState();
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: products, error } = useSWR("https://api.escuelajs.co/api/v1/products", fetcher);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getAllUsers(currentPage, searchTerm);
        console.log(response.data);
        setUsers(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [currentPage, searchTerm, showModal, deleteModal]);

  const ItemsTable = ({ items }) => {
    return (
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={`${item.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="pl-3 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src={item.photo_url ? item.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={item.username} />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{item.username}</div>
                    <div className="font-normal text-gray-500">{item.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 ">
                <div className="text-base  text-gray-900  font-semibold">{item.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-base  text-gray-900  font-semibold">{item.phone_number}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const TableActions = ({ searchTerm, handleSearch }) => {
    const [searchTerms, setSearchTerm] = useState(searchTerm);
    const handleSubmit = (e) => {
      e.preventDefault();
      handleSearch(searchTerms);
    };

    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };

    return (
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full ">
          <form onSubmit={handleSubmit} className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full ">
              <input
                type="text"
                value={searchTerms}
                onChange={handleChange}
                id="simple-search"
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required=""
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400" aria-label="Search">
                <button type="submit">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.306 14.3a6.5 6.5 0 111.414-1.414l4.95 4.95a1 1 0 11-1.414 1.414l-4.95-4.95zM10 16.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            onClick={() => {
              setCategory(null);
              setShowModal(true);
            }}
            className="bg-blue-700 flex items-center mx-1 justify-center text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            type="button"
          >
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Add Category
          </button>
        </div> */}
      </div>
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
  const ItemsTableContainer = () => {
    const handleChangePage = (page) => {
      setCurrentPage(page);
    };

    //search filter
    const handleSearch = (event) => {
      setSearchTerm(event.toLowerCase());
    };

    return (
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <TableActions className="mt-3" searchTerm={searchTerm} handleSearch={handleSearch} />
        {showModal && <CreateModal category={category} />}
        {deleteModal && <DeleteModal category={category} />}
        <div className="overflow-x-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <ItemsTable items={users?.data} />
          </div>
        </div>
        <TableFooter totalPages={users?.pagination.totalPages} handleChangePage={handleChangePage} currentPage={currentPage} />
        {/* <DeleteToast /> */}
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    );
  };

  //main
  return (
    <section className="blur-lg">
      <div className={`mx-auto max-w-screen-xl p-5 lg:px-12 ${showModal ? "blur-lg" : ""}`}>
        <ItemsTableContainer />
      </div>
    </section>
  );
}
