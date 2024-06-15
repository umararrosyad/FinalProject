import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImageCategory({ categories }) {
  // console.log(categories.photo_url);
  // console.log(categories);
  return (
    <Link href={`/search?name=&short=&category=${categories.id}`}>
      <div class="max-w-full flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={categories.photo_url} alt="" />
        <div class=" text-sm py-2 font-bold mx-auto tracking-tight text-gray-900 dark:text-white">{categories.category_name}</div>
      </div>
    </Link>
  );
}
