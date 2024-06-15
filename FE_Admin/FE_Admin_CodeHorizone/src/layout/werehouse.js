"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { getAllWerehouse, createWerehouse, updateWerehouse, deleteWerehouse } from "../modules/fetch/werehouse";
import { getCity, getProvince } from "../modules/fetch/rajaOngkir";
import Image from "next/image";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [werehouse, setWerehouse] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [cities, setCities] = useState();
  const [provinces, setProvinces] = useState();
  const [werehouses, setWerehouses] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedProvince, setSelectedProvince] = useState();

  const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getProvince();
        setProvinces(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();

    const fetchcity = async () => {
      try {
        const response = await getCity();
        setCities(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchcity();
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getAllWerehouse(currentPage, searchTerm);
        setWerehouses(response);
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
              name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              city
            </th>
            <th scope="col" className="px-6 py-3">
              province
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={`${item.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="pl-3 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="text-base font-semibold">{item.werehouse_name}</div>
                  {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                </div>
              </th>
              <td className=" py-4">
                <div className="pl-3 flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="text-base font-semibold">{item.address}</div>
                  {/* <div className="font-normal text-gray-500">neil.sims@flowbite.com</div> */}
                </div>
              </td>
              <td className="py-4">
                <div className="pl-3 flex flex-col py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="text-base font-semibold">{item.city.city_name}</div>
                  <div className="font-normal text-gray-500">Raja Ongkir ID : {item.city_id}</div>
                </div>
              </td>
              <td className=" py-4">
                <div className="pl-3 flex flex-col py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="text-base font-semibold">{item.province.province_name}</div>
                  <div className="font-normal text-gray-500">Raja Ongkir ID : {item.province_id}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => {
                    setWerehouse(item);
                    setShowModal(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                  onClick={() => {
                    setWerehouse(item);
                    setDeleteModal(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
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
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
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
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            onClick={() => {
              setWerehouse(null);
              setShowModal(true);
            }}
            className="bg-blue-700 flex items-center mx-1 justify-center text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            type="button"
          >
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Add Warehouse
          </button>
        </div>
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
        {showModal && <CreateModal werehouse={werehouse} />}
        {deleteModal && <DeleteModal werehouse={werehouse} />}
        <div className="overflow-x-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <ItemsTable items={werehouses?.data} />
          </div>
        </div>
        <TableFooter totalPages={werehouses?.pagination.totalPages} handleChangePage={handleChangePage} currentPage={currentPage} />
        {/* <DeleteToast /> */}
      </div>
    );
  };

  const CreateModal = (werehouse) => {
    const [selectedProvince, setSelectedProvince] = useState(werehouse?.werehouse?.province_id);

    // console.log(werehouse);

    const handleSelectChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedProvince(selectedOptions);
    };

    async function handleSubmit(event) {
      event.preventDefault();

      const city = event.target.elements.city.value;
      const province = event.target.elements.province.value;
      const werehouse_name = event.target.elements.name.value;
      const address = event.target.elements.address.value;

      if (city == "Choose City" || province == "Choose Province") {
        toast.error("Please select location", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        return;
      }
      if (werehouse?.werehouse) {
        try {
          console.log(werehouse?.werehouse?.id, werehouse_name, address, province, city);
          const data = await updateWerehouse(werehouse?.werehouse?.id, werehouse_name, address, province, city);
          console.log(data);
          setShowModal(false);
          toast.success("success updated data", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        } catch (error) {
          toast.error("error updated data", {
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
        return;
      }
      try {
        const response = await createWerehouse(werehouse_name, address, province, city);
        event.target.reset();
        
        setShowModal(false);
        toast.success("success created data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } catch (error) {
        toast.success("success updated data", {
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

    return (
      <div id="authentication-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative mt-6 w-full max-w-lg max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative bg-gray-700 border-black border-2 rounded-lg shadow-lg dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-white dark:text-white">{werehouse.werehouse ? "Update Warehouse" : "Create Warehouse"}</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-4 md:p-5">
              <form class="space-y-4" action="#" onSubmit={handleSubmit}>
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-white dark:text-white">
                    Warehouse Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required
                    defaultValue={werehouse?.werehouse?.werehouse_name}
                  />
                </div>
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-white dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    required
                    defaultValue={werehouse?.werehouse?.address}
                  />
                </div>
                <label for="province" class="block mb-2 text-sm font-medium text-white dark:text-white">
                  Select an Province
                </label>
                <select
                  id="province"
                  onChange={handleSelectChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {selectedProvince ? (
                    <option selected value={selectedProvince}>
                      {provinces[selectedProvince - 1].province_name}
                    </option>
                  ) : (
                    <option selected>Choose Province</option>
                  )}
                  {provinces?.map((province) => (
                    <option value={province.id}>{province.province_name}</option>
                  ))}
                </select>

                <label for="city" class="block mb-2 text-sm font-medium text-white dark:text-white">
                  Select an City
                </label>
                <select
                  id="city"
                  // onChange={handleSelectChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {selectedProvince == werehouse?.werehouse?.province_id && werehouse?.werehouse?.city_id ? (
                    <option selected value={werehouse?.werehouse?.city_id}>
                      {cities[werehouse?.werehouse?.id - 1].city_name}
                    </option>
                  ) : (
                    <option selected>Choose city</option>
                  )}
                  {cities?.map((city) => (selectedProvince == city.province_id ? <option value={city.id}>{city.city_name}</option> : ""))}
                </select>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {werehouse.werehouse ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = (werehouse) => {
    async function handleDelete() {
      try {
        const data = await deleteWerehouse(werehouse?.werehouse?.id);
        console.log(data);
        toast.success("success delete data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        setTimeout(() => {
          setDeleteModal(false);
        }, 2000);
      } catch (error) {
        toast.error("Erorr delete data", {
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

    return (
      <div id="popup-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-gray-700 border-black border-2 rounded-lg shadow-lg dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-white dark:text-gray-400">Are you sure you want to delete this werehouse?</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => {
                  handleDelete();
                }}
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => {
                  setDeleteModal(false);
                }}
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoadingTable = () => {
    return (
      <div className=" bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingRowsCount.map((product) => (
                  <tr key={`${product.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        </label>
                      </div>
                    </td>
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="pl-3">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  //main
  return (
    <section className="blur-lg">
      <div className={`mx-auto max-w-screen-xl p-5 lg:px-12 ${showModal ? "blur-lg" : ""}`}>
        <ItemsTableContainer />
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    </section>
  );
}
