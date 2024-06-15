import React, { useState, useEffect } from "react";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import NavbarBottom from "./NavbarBottom";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setName, setLimit, setShort } from "@/store/reducers/search";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const { name, category, short } = router.query;

  const dispatch = useDispatch();
  const name_q = useSelector((state) => state.search.name);
  const category_q = useSelector((state) => state.search.category);
  const limit_q = useSelector((state) => state.search.limit);
  const short_q = useSelector((state) => state.search.short);
  let getToken;
  
  if (typeof window !== "undefined") {
    getToken = window.localStorage.getItem("token");
  }

  useEffect(() => {
    dispatch(setName(name));
    dispatch(setCategory(category));
    dispatch(setShort(short));

    if (getToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [getToken, name, category, short]);

  const handleSearch = (e) => {
    e.preventDefault();
    const name = e.target.elements.search.value;
    console.log(name);
    router.push({
      pathname: "/search",
      query: { name: name, category: category, short : short }
    });
  };

  return (
    <div className="fixed w-full p-5 z-10 border-b-2 border-white bg-primary">
      <div className="flex flex-row items-center mx-5 gap-5">
        <div>
          <Link href={"/"}>
            <Image src={logo} width={200} height={80} alt="/" />
          </Link>
        </div>
        <div className="w-full md:mx-20">
          <form className="flex items-center" onSubmit={handleSearch}>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="search"
                name="search"
                defaultValue={name_q}
                className="bg-gray-50 border ps-6 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-500 focus:border-primary-500 block w-full pl-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
        {isLogin && (
          <div className="">
            <Link href="/cart">
              <div className="">
                <svg class="w-8 h-8 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3" />
                </svg>
              </div>
            </Link>
          </div>
        )}

        {isLogin && (
          <div>
            <Link href="/account">
              <div class="w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img class="w-8 h-8 rounded-full" src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="Rounded avatar" />
              </div>
            </Link>
          </div>
        )}

        {!isLogin && (
          <div>
            <Link href="/login">
              <button className="bg-gray-200 text-black text-sm font-bold rounded-full w-full px-8 py-2">Login</button>
            </Link>
          </div>
        )}

        {/* {isLogin && (
              <li>
                <Link href="/">
                  <button className="bg-peach text-black text-sm font-bold rounded-full w-full px-8 py-2" onClick={() => localStorage.removeItem("token")}>
                    Logout
                  </button>
                </Link>
              </li>
            )} */}
      </div>
      {/* <NavbarBottom />   */}
    </div>
  );
}
