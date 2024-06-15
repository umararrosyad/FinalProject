import Image from "next/image";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { getAllProducts, createProducts, getOneProducts, updateProducts, deleteProducts } from "@/modules/fetch/products";
import { getAllCategories } from "@/modules/fetch/categories";
import ProductList from "@/components/ProductList";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setName, setLimit, setShort } from "@/store/reducers/search";
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`text-yellow-400 ${i < Math.floor(rating) ? "fill-current" : "stroke-current"}`}>
        ★
      </span>
    );
  }
  return stars;
};

export default function SearchProduct() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [currentPage, setCurentPage] = useState(1);

  const router = useRouter();

  const { name, category, short } = router.query;

  const dispatch = useDispatch();
  const name_q = useSelector((state) => state.search.name);
  const category_q = useSelector((state) => state.search.category);
  const limit = useSelector((state) => state.search.limit);
  const short_q = useSelector((state) => state.search.short);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setName(name));
        dispatch(setCategory(category));
        dispatch(setShort(short));

        const dataProducts = await getAllProducts(currentPage, name, category, short, 8);
        const dataCategories = await getAllCategories();
        setProducts(dataProducts.data);
        setPagination(dataProducts.pagination);
        setCategories(dataCategories.data);
        console.log("pagination ", dataProducts.pagination);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, category, short, currentPage]);

  const TableFooter = () => {
    return (
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 space-x-2">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
          &nbsp;of
          <span className="font-semibold text-gray-900 dark:text-white">{pagination?.totalPages}</span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <a
              href="#"
              onClick={() => {
                if (currentPage > 1) {
                  setCurentPage(currentPage - 1);
                }
              }}
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
          {Array.from({ length: pagination?.totalPages }).map((_, index) => (
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
              onClick={() => {
                if (currentPage < pagination?.totalPages) {
                  setCurentPage(currentPage + 1);
                }
              }}
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

  const handleChangePage = (page) => {
    setCurentPage(page);
  };

  return (
    <div className="w-full ">
      <div className="w-full mb-3">
        <div className="flex flex-row justify-between mb-3 border border-gray-50 item-center w-full rounded-lg bg-primary h-auto py-2">
          <h1 className="ps-5 text-gray-50 text-2xl font-bold">Hasil Pencarian</h1>
        </div>
      </div>
      <div>
        <div className="w-full ">
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-5">
            {products?.map((products) => (
              <ProductList key={products.id} products={products} />
            ))}
          </div>
        </div>
      </div>
      <TableFooter />
    </div>
  );
}
