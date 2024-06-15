import React, { useState, useEffect, useRef } from "react";
import { getShortProduct, getData } from "@/modules/fetch/dashboard";
import { map } from "lodash";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, HorizontalBar, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
export default function myDashboard() {
  const [bestSeller, setBestSeller] = useState([]);
  const [bestRating, setBestRating] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getShortProduct("5", "total_sold");
        setBestSeller(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
    const fetchbestRating = async () => {
      try {
        const response = await getShortProduct("5", "rating");
        setBestRating(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchbestRating();

    const fetchData = async () => {
      try {
        const response = await getData();
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log("aa");
  }, []);

  return (
    <>
      <div className=" p-5 m-5">
        <div class="grid grid-cols-4 gap-4">
          <div>
            <div class="max-w-sm p-5 bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row justify-between">
                <svg class="w-7 h-7 text-white dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <p className="text-2xl  text-white font-bold">{data?.product}</p>
              </div>
              <a href="#">
                <h5 class="mt-2 text-lg font-semibold tracking-tight text-white dark:text-white">Total Products</h5>
              </a>
            </div>
          </div>
          <div>
            <div class="max-w-sm p-5 bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row justify-between">
                <svg class="w-7 h-7 text-white dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <p className="text-2xl text-white font-bold">{data?.user}</p>
              </div>
              <a href="#">
                <h5 class="mt-2 text-lg font-semibold tracking-tight text-white dark:text-white">Total Users</h5>
              </a>
            </div>
          </div>
          <div>
            <div class="max-w-sm p-5 bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row justify-between">
                <svg class="w-7 h-7 text-white dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <p className="text-2xl text-white font-bold">{data?.transaction}</p>
              </div>
              <a href="#">
                <h5 class="mt-2 text-lg font-semibold tracking-tight text-white dark:text-white">Total Transaction</h5>
              </a>
            </div>
          </div>
          <div>
            <div class="max-w-sm p-5 bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row justify-between">
                <svg class="w-7 h-7 text-white dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <p className="text-2xl text-white font-bold">{data?.finishTransaction}</p>
              </div>
              <a href="#">
                <h5 class="mt-2 text-lg font-semibold tracking-tight text-white dark:text-white">Finish Transactions</h5>
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-5 h-52 flex-row gap-4">
          <div className="w-full bg-white rounded-lg border border-gray-400 shadow-lg dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 p-3">
              <dl>
                <dd className="leading-none text-2xl font-bold text-gray-900 dark:text-white">Best Saller</dd>
                <dt className="text-lg font-normal text-gray-500 dark:text-gray-400 pb-1">Recommendation Product</dt>
              </dl>
            </div>
            <div className="h-10" style={{ height: "300px" }}>
              <Bar
                data={{
                  labels: bestSeller?.map((item) => item.name),
                  datasets: [
                    {
                      label: "Product Sold",
                      data: bestSeller?.map((item) => item.total_sold),
                      backgroundColor: ["rgba(55, 65, 81, 0.8)", "rgba(55, 65, 81, 0.8)", "rgba(55, 65, 81, 0.8)"],
                      borderRadius: 5
                    }
                  ]
                }}
                options={{
                  indexAxis: "y", // Mengatur sumbu x menjadi sumbu y
                  scales: {
                    x: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full bg-white border border-gray-400 rounded-lg shadow-lg dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 p-3">
              <dl>
                <dd class="leading-none text-2xl font-bold text-gray-900 dark:text-white">Top Rating</dd>
                <dt class="text-lg font-normal text-gray-500 dark:text-gray-400 pb-1">Recomendation Product</dt>
              </dl>
            </div>

            {/* Grafik Bar */}
            <div className="h-10 -mt-5" style={{ height: "300px" }}>
              <Bar
                data={{
                  labels: bestRating?.map((item) => item.name),
                  datasets: [
                    {
                      label: "Product Rating",
                      data: bestRating?.map((item) => item.rating_product),
                      backgroundColor: ["rgba(43, 63, 229, 0.8)", "rgba(250, 192, 19, 0.8)", "rgba(253, 135, 135, 0.8)"],
                      borderRadius: 5
                    }
                  ]
                }}
                options={{
                  indexAxis: "y", // Mengatur sumbu x menjadi sumbu y
                  scales: {
                    x: {
                      beginAtZero: true,
                      max: 5
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
