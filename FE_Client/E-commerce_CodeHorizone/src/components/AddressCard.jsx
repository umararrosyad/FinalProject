import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export default function AddressCard() {
  const CardAddress = () => {
    return (
      <>
        <div class="w-full bg-primary dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-5">
          <address class="relative bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
            <div class="space-y-2 text-gray-800 dark:text-gray-400 leading-loose hidden sm:block">
              Address <br />
              City <br />
              Province
            </div>
            <div id="contact-details" class="space-y-2 text-gray-900 dark:text-white font-medium leading-loose">
              jl in aja <br />
              bantul <br />
              jawa timur
            </div>
            <button
              data-copy-to-clipboard-target="contact-details"
              data-copy-to-clipboard-content-type="textContent"
              data-tooltip-target="tooltip-contact-details"
              class="absolute end-2 top-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
            ></button>
            <div
              id="tooltip-contact-details"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              <span id="default-tooltip-message-contact-details">Copy to clipboard</span>
              <span id="success-tooltip-message-contact-details" class="hidden">
                Copied!
              </span>
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </address>
        </div>
      </>
    );
  };
  return (
    <div className="w-full ">
      <div className="bg-white border-2 border-primary rounded-lg shadow-md py-4 px-8">
        <div className="flex justify-between w-full items-center mb-1">
          <h1 className="text-2xl mb-2 font-bold">Alamat Saya</h1>
          <button className="bg-primary text-white font-bold py-2 px-5 rounded-lg">+ Tambah Alamat Baru</button>
        </div>
        <hr class="h-px bg-primary border-0 mb-5 dark:bg-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
}
