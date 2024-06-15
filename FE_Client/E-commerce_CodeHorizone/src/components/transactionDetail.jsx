import Image from "next/image";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAddressUser } from "@/modules/fetch/address";
import { getCost } from "@/modules/fetch/rajaOngkir";
import { useSelector, useDispatch } from "react-redux";
import { fillProduct, removeProduct, clearProduct, updateProduct } from "@/store/reducers/product";
import { propTypeVariant } from "@material-tailwind/react/types/components/timeline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTransaction } from "@/modules/fetch/transaction";
import { getOneTransaction, deleteTransaction, uploadBukti, updateTransaction } from "@/modules/fetch/transaction_Copy";
import { sendVerification } from "@/modules/fetch/email";
import { createFeedback } from "@/modules/fetch/feedback";

export default function CartPage() {
  const [transaction, setTransaction] = useState();
  const [totalHarga, setTotalharga] = useState();
  const [alamat, setAlamat] = useState();
  const [cost, setCost] = useState(0);
  const [payment, setPayment] = useState();
  const [isRefresh, setRefresh] = useState();

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.product_detail);
  const router = useRouter();

  let user_id;

  if (typeof window !== "undefined") {
    user_id = window.localStorage.getItem("user_id");
  }

  const { id } = router.query;

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getOneTransaction(id);
        setTransaction(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCard();
    setRefresh(false);
  }, [isRefresh]);

  const CartDetail = ({ item, index }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [qty, setQty] = useState(item?.qty);
    const [totalPrice, setTotalPrice] = useState(qty * item?.product_variant?.price);

    return (
      <>
        <div className="w-full ms-5 flex flex-row justify-between ">
          <div className="flex flex-row gap-10">
            <img
              className="w-40 h-40 object-cover shadow-lg border self-center border-gray-300"
              src={item?.product_variant?.product_type?.photo_url ? item?.product_variant?.product_type?.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Neil image"
            />
            <div className="flex flex-col gap-3 self-center">
              <div className="text-lg font-bold">{item?.product_variant?.product?.name}</div>
              <div className="text-md font-medium">
                variant : {item?.product_variant?.product_type?.type_name}, {item?.product_variant?.product_size?.size_name}
              </div>
              <div className="text-md font-medium">harga : Rp.{Number(item?.product_variant?.price).toLocaleString("id-ID")}</div>
              {/* <div className="text-sm font-medium">tersisa {item?.product_variant?.stock} item</div> */}
            </div>
            <div className="relative flex flex-row ms-5 self-center h-10 bg-button border  rounded-sm">
              <div className="text-md font-bold mx-2 self-center">X {qty}</div>
            </div>
          </div>
          <div className="text-xl font-bold self-center me-10 justify-self-end"> Rp.{Number(totalPrice).toLocaleString("id-ID")}</div>
        </div>
        <hr class="h-px mx-1 mb-5 mt-5 bg-gray-400 border-0 dark:bg-gray-700" />
      </>
    );
  };

  const handleRadioChange = (item) => {
    setAlamat(item);
  };

  const handlePesan = async () => {
    if (!alamat) {
      toast.error("Pilih alamat terlebih dahulu", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let transaction_detail = [];
      productDetail.map((item) => {
        transaction_detail.push({ product_variant_id: item.product_variant_id, price: item.product_variant.price * item.qty, qty: item.qty });
      });

      try {
        const response = await createTransaction(user_id, alamat.id, totalHarga, cost, payment, transaction_detail);
        console.log(response.data);
        router.push("/order");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleKirim = async () => {
    if (!selectedFile) {
      toast.error("Please select image", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      console.log("fffffghh");
      const response = await uploadBukti(user_id, id, formData);
      console.log(response.data);
      setSelectedFile();

      toast.success("success upload bukti data", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setRefresh(true);
    } catch (error) {
      toast.error("gagal kirim bukti pembayaran", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleTerima = async () => {
    try {
      console.log("fffffghh");
      const response = await updateTransaction(user_id, id, "Diterima");
      console.log(response.data);
      setSelectedFile();

      const data = {
        service_id: "service_zikzc15",
        template_id: "template_dsbpa88",
        user_id: "VbfJ1FDMopn7GXFvi",
        template_params: {
          send_to: "otp.wilis.net@gmail.com",
        },
      };
      await sendVerification(data);

      toast.success("success terima barang data", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRefresh(true);
    } catch (error) {
      toast.error("gagal kirim bukti pembayaran", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleHapus = async () => {
    try {
      const response = await deleteTransaction(user_id, id);
      router.push("/order");
    } catch (error) {}
  };

  const [rating, setRating] = useState();
  const handleRating = async (rat) => {
    if (rating == rat) {
      setRating();
    } else {
      setRating(rat);
    }
  };

  async function handlsubmit(event) {
    event.preventDefault();
    const pesan = event.target.elements.pesan.value;

    if (!rating) {
      toast.error("Pilih Rating Terlebih Dahulu", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      transaction?.transaction_details.map(async (item) => {
        item?.product_variant.product_id;
        await createFeedback(item?.product_variant.product_id,user_id, item?.product_variant_id, pesan, rating);
      });
      const response = await updateTransaction(user_id, id, "Selesai");
      toast.success("transaksi selesai", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRefresh();
    } catch (error) {
      toast.error("error create data", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="w-full gap-5 flex flex-row">
      <div className="container w-full h-full bg-white border-2 border-primary rounded-lg mb-5 p-2 mx-auto px-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl mt-1 font-semibold mb-4">No Pesanan # {transaction?.id}</h1>
          <div className="bg-primary item-center self-center font-bold text-white rounded-md p-2">{transaction?.transaction_status}</div>
        </div>
        <hr class="h-px bg-primary  border-0 mb-5 dark:bg-gray-700" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            {transaction?.transaction_details?.map((item, index) => (
              <CartDetail item={item} index={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5 -mt-2 justify-start">
          <div className="flex flex-row justify-between">
            <div className="text-lg font-bold">Alamat Pengiriman</div>
          </div>
          <div className="w-full border border-gray-500 rounded-md p-5">
            {transaction?.address?.address}, {transaction?.address?.city?.city_name}, {transaction?.address?.province?.province_name}
          </div>
          {transaction?.transaction_status == "Dikirim" && (
            <>
              <button className="bg-primary rounded-md p-2 mt-2 text-md font-bold text-white " onClick={() => handleTerima()}>
                Terima Barang
              </button>
            </>
          )}
          {transaction?.transaction_status == "Diterima" && (
            <>
              <div className="text-md mt-5 font-bold"> Kirim Feedbacks</div>
              <div className="grid grid-cols-5 gap-4">
                <div className={`border flex font-bold justify-center ${rating == "1" ? "bg-primary text-white" : ""} border-primary p-3 text-sm`} onClick={() => handleRating("1")}>
                  1
                  <svg class="w-4 h-4 ms-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className={`border flex font-bold justify-center ${rating == "2" ? "bg-primary text-white" : ""} border-primary p-3 text-sm`} onClick={() => handleRating("2")}>
                  2
                  <svg class="w-4 h-4 ms-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className={`border flex font-bold justify-center ${rating == "3" ? "bg-primary text-white" : ""} border-primary p-3 text-sm`} onClick={() => handleRating("3")}>
                  3
                  <svg class="w-4 h-4 ms-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className={`border flex font-bold justify-center ${rating == "4" ? "bg-primary text-white" : ""} border-primary p-3 text-sm`} onClick={() => handleRating("4")}>
                  4
                  <svg class="w-4 h-4 ms-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <div className={`border flex font-bold justify-center ${rating == "5" ? "bg-primary text-white" : ""} border-primary p-3 text-sm`} onClick={() => handleRating("5")}>
                  5
                  <svg class="w-4 h-4 ms-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>

              <form onSubmit={handlsubmit}>
                <label for="large-input" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                  Pesan
                </label>
                <input
                  type="text"
                  id="pesan"
                  name="pesan"
                  required
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button type="submit" className="bg-primary rounded-md p-2 mt-2 text-md font-bold text-white ">
                  Kirim rating
                </button>
              </form>
            </>
          )}
        </div>
        <div className="flex flex-row justify-end"></div>
      </div>

      <div className="w-full flex flex-col gap-5 max-w-sm">
        <div className="bg-white rounded-lg border-2 w-full  border-primary shadow-md p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Detail Pembayaran</h2>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <div className="text-md font-bold">Product Price</div>
            </div>
            <span className="self-center font-bold"> Rp.{Number(transaction?.product_price).toLocaleString("id-ID")}</span>
          </div>
          <hr class="h-px mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <div className="text-md font-bold">Shipping Price</div>
            </div>
            <span className="self-center font-bold"> Rp.{Number(transaction?.shipping_price).toLocaleString("id-ID")}</span>
          </div>
          <hr class="h-px mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="flex justify-between mb-2"></div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total Payment</span>
            <span className="font-semibold"> Rp.{Number(transaction?.total_price).toLocaleString("id-ID")}</span>
          </div>
          {/* <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handlePesan()}>
            Kirim Bukti Pembayaran
          </button>
          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handlePesan()}>
            batalkan Pesanan
          </button> */}
          {/* </Link> */}
        </div>
        {transaction?.transaction_status == "Belum Dibayar" && (
          <div className="bg-white rounded-lg border-2 w-full border-primary shadow-md p-6">
            {selectedFile && (
              <div className="mt-4">
                <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="w-full h-auto rounded-lg" />
              </div>
            )}
            <div className="bg-primary flex text-white font-bold py-2 px-4 rounded-lg mt-4 w-full">
              <label htmlFor="dropzone-file" className="w-full flex justify-center">
                {selectedFile ? "Ganti Foto" : "Upload bukti pembayaran"}
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            {selectedFile && (
              <div className="bg-primary flex text-white font-bold py-2  self-center justify-center  px-4 rounded-lg mt-4 w-full" onClick={() => handleKirim()}>
                Kirim
              </div>
            )}
            <button className="bg-red-600 text-white  self-center flex justify-center font-bold py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handleHapus()}>
              batalkan Pesanan
            </button>
          </div>
        )}
        {transaction?.transaction_status != "Belum Dibayar" && (
          <div className="bg-white rounded-lg border-2 w-full border-primary shadow-md p-6">
            {transaction?.payment_photo_url && (
              <div className="mt-4">
                <img src={transaction?.payment_photo_url} alt="Selected File" className="w-full h-auto rounded-lg" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
