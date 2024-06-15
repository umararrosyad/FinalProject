import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setSideLocation } from "@/store/reducers/sideLocation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getAllVariant, updateVariant } from "@/modules/fetch/variant";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);
  const [variants, setVariants] = useState();
  const [variant, setVariant] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllVariant(id);
        console.log(response.status);
        if (response.status == "error") {
          setVariants(null);
        } else {
          setVariants(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [showModal]);

  const handleAsideClick = (location) => {
    dispatch(setSideLocation(location));
  };

  const Modal = (item) => {
    console.log("item");
    console.log(item);
    async function handleSubmit(event) {
      event.preventDefault();
      const weight = event.target.elements.weight.value;
      const price = event.target.elements.price.value;
      const stock = event.target.elements.stock.value;
      try {
        const response = await updateVariant(id, item?.item?.id, weight, price, stock);
        console.log(response);

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
        toast.error("success create data", {
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
      <>
        <div id="authentication-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative mt-6 w-full max-w-lg max-h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-gray-700 border-black border-2 rounded-lg shadow-lg dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-white dark:text-white">
                  {item?.item?.product_type?.type_name}, {item?.item?.product_size?.size_name}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setVariant();
                  }}
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
                  <label for="weight" class="block mb-2 text-sm font-medium text-white dark:text-white">
                    weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    defaultValue={item?.item?.weight}
                    required
                  />
                  <label for="price" class="block mb-2 text-sm font-medium text-white dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    defaultValue={item?.item?.price}
                    required
                  />
                  <label for="stock" class="block mb-2 text-sm font-medium text-white dark:text-white">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder=""
                    defaultValue={item?.item?.stock}
                    required
                  />
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    submit
                    {/* {category.category ? "Update" : "Create"} */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Card = (item) => {
    return (
      <>
        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-md font-bold leading-none text-gray-900 dark:text-white">
              {item?.item?.product_type?.type_name}, {item?.item?.product_size?.size_name}
            </h5>
            <button
              type="button"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => {
                setShowModal(true);
                setVariant(item?.item);
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
            {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={()=>{setShowModal(true); setVariant(item?.item)}}>
              edit
            </a> */}
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4">
                <div class="flex items-center">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Weight</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item?.item?.weight} g</div>
                </div>
              </li>
              <li class="py-3 sm:py-4">
                <div class="flex items-center ">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Price</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">Rp {item?.item?.price}</div>
                </div>
              </li>
              <li class="pt-3 pb-0 sm:pt-4">
                <div class="flex items-center ">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Stock</p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{item?.item?.stock}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div class="p-6 mb-10 h-auto bg-gray-800 text-medium text-gray-100 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4">
          <div className="w-full md:w-1/2">
            <div class="block -mt-3 text-2xl font-medium text-white dark:text-white">PRODUCTS VARIANT</div>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"></div>
        </div>

        {showModal && <Modal item={variant} />}

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {variants?.map((variant) => (
            <div>
              <Card item={variant} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
