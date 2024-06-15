import { Rating } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getAllProducts, createProducts, getOneProducts, updateProducts, deleteProducts } from "@/modules/fetch/products";
import { getAllCategories } from "@/modules/fetch/categories";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setName, setLimit, setShort } from "@/store/reducers/search";
import { useRouter } from "next/router";

export default function FilterBar() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  const router = useRouter();

  const { name, category, short } = router.query;
  const dispatch = useDispatch();
  const name_q = useSelector((state) => state.search.name);
  const category_q = useSelector((state) => state.search.category);
  const limit_q = useSelector((state) => state.search.limit);
  const short_q = useSelector((state) => state.search.short);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setName(name));
        console.log(name_q);
        dispatch(setCategory(category));
        dispatch(setLimit(short));
        const dataProducts = await getAllProducts();
        const dataCategories = await getAllCategories();
        console.log("response", dataProducts);
        console.log("response", dataCategories);
        setProducts(dataProducts.data);
        setCategories(dataCategories.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, category, short]);

  function handleCategory(id) {
    if (id == category_q) {
      router.push({
        pathname: "/search",
        query: { name: name_q, category: "", short: short_q }
      });
    } else {
      router.push({
        pathname: "/search",
        query: { name: name_q, category: id, short: short_q }
      });
    }
  }

  function handleShort(short) {
    if (limit_q == short) {
      router.push({
        pathname: "/search",
        query: { name: name_q, category: category_q, short: "" }
      });
    } else {
      router.push({
        pathname: "/search",
        query: { name: name_q, category: category_q, short: short }
      });
    }
  }

  return (
    <div className="flex w-1/4 h-full max-w-sm">
      <div className="flex flex-col w-full p-4 shadow-xl rounded-md border-2 border-primary shadow-blue-gray-900/5 mb-7">
        <h1 className=" text-lg font-bold">Filter</h1>
        <hr class="h-px bg-primary border-0 mb-3 dark:bg-gray-700" />
        <div className="mb-3">
          <h1 className="text-lg mb-3 font-bold">Category</h1>
          <ul class="flex-column w-full space-y ps-3 space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
            {categories?.map((item) => (
              <li>
                <button
                  class={`inline-flex ${item?.id == category_q ? "text-white bg-primary" : "border border-primary hover:text-gray-900  hover:bg-gray-100 bg-gray-50"}  items-center px-4 py-3 rounded-lg  w-full `}
                  onClick={() => handleCategory(item?.id)}
                >
                  {item?.category_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <h1 className="text-lg mb-3 font-bold">Short By</h1>
          <ul class="flex flex-col w-full ps-3 space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
            <li>
              <button
                class={`inline-flex ${short_q == "price" ? "text-white bg-primary" : "border border-primary hover:text-gray-900  hover:bg-gray-100 bg-gray-50"}  items-center px-4 py-3 rounded-lg  w-full `}
                aria-current="page"
                onClick={() => handleShort("price")}
              >
                Best Price
              </button>
            </li>
            <li>
              <button
                class={`inline-flex  ${short_q == "rating" ? "text-white bg-primary" : "border border-primary hover:text-gray-900  hover:bg-gray-100 bg-gray-50"}  items-center px-4 py-3 rounded-lg  w-full `}
                onClick={() => handleShort("rating")}
              >
                Best Rating
              </button>
            </li>
            <li>
              <button
                class={`inline-flex  ${short_q == "total_sold" ? "text-white bg-primary" : "border border-primary hover:text-gray-900  hover:bg-gray-100 bg-gray-50"}  items-center px-4 py-3 rounded-lg  w-full `}
                onClick={() => handleShort("total_sold")}
              >
                Best Seller
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
