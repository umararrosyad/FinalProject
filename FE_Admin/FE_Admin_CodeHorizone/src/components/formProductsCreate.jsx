import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../modules/fetch/categories";
import { getonlyWerehouse } from "../modules/fetch/werehouse";
import { createProducts } from "../modules/fetch/products";
import { useSelector, useDispatch } from "react-redux";
import { setSideLocation } from "@/store/reducers/sideLocation";

import { useRouter } from "next/router";

const Form = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);
  const [categories, setCategories] = useState();
  const [werehouses, setWereouses] = useState();
  const router = useRouter();

  async function handlsubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const category = event.target.elements.category.value;
    const werehouse = event.target.elements.werehouse.value;
    const description = event.target.elements.description.value;

    if (category == "Choose Category" || werehouse == "Choose werehouse") {
      toast.error("Please select category and werehoouse", {
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
    try {
      const response = await createProducts(name, category, werehouse, description);
      event.target.reset();
      toast.success("success created products", {
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
        router.push(`/products/${response.data.data.id}`);
      }, 2000);
    } catch (error) {
      toast.error("error create data", {
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategory();
    const fetchwerehouse = async () => {
      try {
        const response = await getonlyWerehouse();
        setWereouses(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchwerehouse();
  }, []);
  return (
    <>
      <div class="p-6 h-auto bg-gray-900 text-medium text-gray-100 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <form class="space-y-4" action="#" onSubmit={handlsubmit}>
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-white dark:text-white">
              Products Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder=""
              required
            />
          </div>
          <label for="category" class="block mb-2 text-sm font-medium text-white dark:text-white">
            Select an Category
          </label>
          <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Category</option>
            {categories?.map((categories) => (
              <option value={categories.id}>{categories.category_name}</option>
            ))}
          </select>

          <label for="werehouse" class="block mb-2 text-sm font-medium text-white dark:text-white">
            Select an warehouse
          </label>
          <select
            id="werehouse"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose warehouse</option>
            {werehouses?.map((werehouse) => (
              <option value={werehouse.id}>{werehouse.werehouse_name}</option>
            ))}
          </select>

          <label for="description" class="block mb-2 text-sm font-medium text-white dark:text-white">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            required
          ></textarea>

          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
