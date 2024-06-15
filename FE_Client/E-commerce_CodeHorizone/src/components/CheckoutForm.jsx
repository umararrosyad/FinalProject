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

export default function CartPage() {
  const [address, setAddress] = useState();
  const [totalHarga, setTotalharga] = useState();
  const [alamat, setAlamat] = useState();
  const [cost, setCost] = useState(0);
  const [payment, setPayment] = useState();

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.product_detail);
  const router = useRouter();

  let user_id;

  if (typeof window !== "undefined") {
    user_id = window.localStorage.getItem("user_id");
  }

  useEffect(() => {
    console.log("productDetail");
    console.log(productDetail);
    let total = 0;
    let shipping = 0;
    productDetail?.forEach((item) => {
      const harga = item?.qty * item?.product_variant?.price;
      total += harga;
      shipping += item.cost;
    });
    setTotalharga(total);
    setCost(shipping);
    setPayment(total + shipping);
  }, [productDetail, cost]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getAddressUser(user_id);
        setAddress(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCard();
  }, []);

  useEffect(() => {
    if (alamat) {
      const fetchCard = async () => {
        productDetail.map(async (item) => {
          const origin = item?.product_variant?.product?.Werehouse.city_id;
          const weight = item?.product_variant?.weight * item.qty;
          const destination = alamat.city_id;
          console.log(origin, weight, destination);
          try {
            const response = await getCost(origin, weight, destination);
            console.log(response.data.rajaongkir.results[0].costs[0].cost[0].value);
            const harga = response.data.rajaongkir.results[0].costs[0].cost[0].value;
            const newItem = { ...item, cost: harga };
            dispatch(updateProduct(newItem));
          } catch (e) {
            console.log(e);
          }
        });
      };
      fetchCard();
    }
  }, [alamat]);

  const CartDetail = ({ item, index }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [qty, setQty] = useState(item?.qty);
    const [totalPrice, setTotalPrice] = useState(qty * item?.product_variant?.price);

    useEffect(() => {
      const found = productDetail.some((detail) => {
        if (detail.id === item.id) {
          setIsCheckout(true);
          setQty(detail.qty);
          return true;
        }
        return false;
      });

      if (!found) {
        setIsCheckout(false);
      }
    }, [productDetail, item]);

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
        <div className="flex flex-row mb-3 mt-5 ms-5 justify-between">
          <div>
            <div className="text-lg font-bold">Dikirim Dari :</div>
            <div className="text-sm font-medium">
              {item?.product_variant?.product?.Werehouse.city.city_name}, {item?.product_variant?.product?.Werehouse.province.province_name}
            </div>
          </div>
          <div className="flex flex-col justify-end me-5">
            <div className="text-sm font-medium">Biaya Pengiriman</div>
            <div className="text-xl font-bold self-end"> Rp.{Number(item?.cost).toLocaleString("id-ID")}</div>
          </div>
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

  return (
    <div className="w-full gap-5 flex flex-row">
      <div className="container w-full h-full bg-white border-2 border-primary rounded-lg mb-5 p-2 mx-auto px-4">
        <h1 className="text-2xl mt-1 font-semibold mb-4">Checkout</h1>
        <hr class="h-px bg-primary  border-0 mb-5 dark:bg-gray-700" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            {productDetail?.map((item, index) => (
              <CartDetail item={item} index={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 mb-5 justify-start">
          <div className="flex flex-row justify-between">
            <div className="text-lg font-bold">Alamat Pengiriman</div>
            <Link href={"/address"}>
              <button className="p-2 self-end bg-primary rounded-sm text-white text-sm font-bold">Tambah Alamat</button>
            </Link>
          </div>
          {address?.map((item, index) => (
            <div key={index} className="flex items-center ps-4 border border-gray-400 rounded dark:border-gray-700">
              <input
                id={`bordered-radio-${index}`}
                type="radio"
                value=""
                name="bordered-radio"
                onChange={() => handleRadioChange(item)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`bordered-radio-${index}`} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {item.address}, {item.city.city_name}, {item.province.province_name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-end"></div>
      </div>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg border-2 w-full  border-primary shadow-md p-6">
          <h2 className="text-lg font-semibold text-center mb-4">Detail Pembayaran</h2>

          {productDetail?.map((item) => (
            <>
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <div className="text-md font-bold">
                    {item?.product_variant?.product?.name}
                    <span> x {item?.qty}</span>
                  </div>
                  <div>
                    {item?.product_variant?.product_type?.type_name}, {item?.product_variant?.product_size?.size_name}
                  </div>
                </div>

                <span className="self-center"> Rp.{Number(item?.qty * item?.product_variant?.price).toLocaleString("id-ID")}</span>
              </div>
              <hr class="h-px mb-5 bg-gray-200 border-0 dark:bg-gray-700" />
            </>
          ))}
          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <div className="text-md font-bold">Product Price</div>
            </div>
            <span className="self-center font-bold"> Rp.{Number(totalHarga).toLocaleString("id-ID")}</span>
          </div>
          <hr class="h-px mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <div className="text-md font-bold">Shipping Price</div>
            </div>
            <span className="self-center font-bold"> Rp.{Number(cost).toLocaleString("id-ID")}</span>
          </div>
          <hr class="h-px mb-5 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="flex justify-between mb-2"></div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total Payment</span>
            <span className="font-semibold"> Rp.{Number(payment).toLocaleString("id-ID")}</span>
          </div>
          {/* <Link href="/checkout"> */}
          <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg mt-4 w-full" onClick={() => handlePesan()}>
            Buat Pesanan
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
