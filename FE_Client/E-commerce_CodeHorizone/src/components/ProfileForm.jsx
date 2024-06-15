import { Radio } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import Link from "next/link";
import { getUser } from "@/modules/fetch/user";
import React, { useEffect, useState } from "react";

export default function Account() {
  const [user, setuser] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserId = localStorage.getItem("user_id");
          if (storedUserId) {
            const response = await getUser(storedUserId);
            console.log(response.status);
            if (response.status == "error") {
              setuser(null);
            } else {
              console.log(response.data.data);
              setuser(response.data.data);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="bg-white border-2 border-primary rounded-lg shadow-md px-8 py-4">
        <h1 className="text-2xl mb-2 font-bold">Profil Saya</h1>
        <hr class="h-px bg-primary border-0 mb-5 dark:bg-gray-700" />
        <form>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <div className="">
                <label for="small-input" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">
                  Nama
                </label>
                <input
                  type="text"
                  id="small-input"
                  defaultValue={user?.name}
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mt-2">
                <label for="small-input" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="small-input"
                  defaultValue={user?.username}
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mt-2">
                <label for="small-input" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  id="small-input"
                  defaultValue={user?.email}
                  disabled
                  readonly
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mt-2">
                <label for="small-input" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="small-input"
                  defaultValue={user?.phone_number}
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div class="border-l border-primary h-auto"></div>
            <div className=" flex flex-col item-center mx-10 ">
              <img class="w-40 h-40 mx-auto rounded-full" src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="Rounded avatar" />
              <input
                class="block w-full my-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
              />
            </div>
          </div>
          <button type="button" class="w-full my-8 text-white bg-primary hover:bg-pink-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
