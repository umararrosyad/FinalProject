import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSideLocation } from "@/store/reducers/sideLocation";
import { useRouter } from "next/router";

export default function Sidebar({ sideLocation }) {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);
  const router = useRouter();

  useEffect(() => {
    if (sideLocation) {
      dispatch(setSideLocation(sideLocation));
      console.log(location);
    }
  }, [sideLocation]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div class="">
      {/* <Card className="bg-peach w-full p-4 shadow-xl shadow-blue-gray-900/5"> */}
      <ul class="flex-column w-full space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <Link
            href="/account"
            class={`inline-flex items-center ps-8 py-3 pe-24 ${location == "profil" ? "text-white bg-primary" : "text-gray-900 bg-gray-50 hover:bg-gray-100 border border-primary"} rounded-lg active w-full dark:bg-blue-600`}
            aria-current="page"
            onClick={() => dispatch(setSideLocation("profil"))}
          >
            <svg class={`w-4 h-4 me-2 ${location == "profil" ? "text-white" : "text-gray-500"} " aria-hidden="true`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/order"
            class={`inline-flex items-center ps-8 py-3  ${location == "pesanan" ? "text-white bg-primary" : "text-gray-900 bg-gray-50 hover:bg-gray-100 border border-primary"} rounded-lg active w-full dark:bg-blue-600`}
            aria-current="page"
            onClick={() => dispatch(setSideLocation("pesanan"))}
          >
            <svg class={`w-4 h-4 me-2 ${location == "pesanan" ? "text-white" : "text-gray-500"} " aria-hidden="true`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            Pesanan Saya
          </Link>
        </li>
        <li>
          <Link
            href="/address"
            class={`inline-flex items-center ps-8 py-3 ${location == "alamat" ? "text-white bg-primary" : "text-gray-900 bg-gray-50 hover:bg-gray-100 border border-primary"}  rounded-lg active w-full dark:bg-blue-600`}
            aria-current="page"
            onClick={() => dispatch(setSideLocation("alamat"))}
          >
            <svg class={`w-4 h-4 me-2 ${location == "alamat" ? "text-white" : "text-gray-500"} " aria-hidden="true`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
            Alamat
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            class={`inline-flex items-center ps-8 py-3 ${location == "keranjang" ? "text-white bg-primary" : "text-gray-900 bg-gray-50 hover:bg-gray-100 border border-primary"}  rounded-lg active w-full dark:bg-blue-600`}
            aria-current="page"
            onClick={() => dispatch(setSideLocation("keranjang"))}
          >
            <svg class={`w-4 h-4 me-2 ${location == "keranjang" ? "text-white" : "text-gray-500"} " aria-hidden="true`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
              <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
            </svg>
            Keranjang
          </Link>
        </li>
        {/* <li>
          <Link
            href="#"
            class={`inline-flex items-center ps-8 py-3 ${location == "ulasan" ? "text-white bg-primary" : "text-gray-900 bg-gray-50 hover:bg-gray-100 border border-primary"} rounded-lg active w-full dark:bg-blue-600`}
            aria-current="page"
            onClick={() => dispatch(setSideLocation("ulasan"))}
          >
            <svg class={`w-4 h-4 me-2 ${location == "ulasan" ? "text-white" : "text-gray-500"} " aria-hidden="true`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
              <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
            </svg>
            ulasan
          </Link>
        </li> */}
        <li>
          <div href="#" class="inline-flex items-center ps-8 py-3 rounded-lg text-white border border-primary bg-red-400 hover:bg-red-500 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>
            <svg class="w-4 h-4 me-2 text-white hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z" />
              <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z" />
            </svg>
            Keluar
          </div>
        </li>
      </ul>
      {/* <List>
          <Link href="/account">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Profil Saya
            </ListItem>
          </Link>
          <Link href="/order">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Pesanan Saya
            </ListItem>
          </Link>
          <Link href="/address">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Alamat Pengiriman
            </ListItem>
          </Link>
          <Link href="/cart">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Keranjang
            </ListItem>
          </Link>
          <Link href="/review">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Ulasan
            </ListItem>
          </Link>
          <Link href="/">
            <ListItem className="font-bold text-lg hover:bg-grape">
              Keluar
            </ListItem>
          </Link>
        </List> */}
      {/* </Card> */}
    </div>
  );
}
