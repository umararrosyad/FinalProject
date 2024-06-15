import Image from "next/image";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { getUserCart, deleteCart } from "@/modules/fetch/cart";
import { useSelector, useDispatch } from "react-redux";
import { fillProduct, removeProduct, clearProduct, updateProduct } from "@/store/reducers/product";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const [carts, setCarts] = useState();
  const [totalHarga, setTotalharga] = useState();
  const router = useRouter();

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.product_detail);

  let user_id;

  if (typeof window !== "undefined") {
    user_id = window.localStorage.getItem("user_id");
  }

  useEffect(() => {
    console.log(productDetail);
    let total = 0;
    productDetail?.forEach((item) => {
      const harga = item?.qty * item?.product_variant?.price;
      total += harga;
    });
    setTotalharga(total);

    const fetchCard = async () => {
      try {
        const response = await getUserCart(user_id);
        setCarts(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCard();
  }, [productDetail]);

  useEffect(() => {
    dispatch(clearProduct());
    const fetchCard = async () => {
      try {
        const response = await getUserCart(user_id);
        setCarts(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCard();
  }, []);

  const CartDetail = ({ item }) => {
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

    function handleCheckboxChange(event) {
      const isChecked = event.target.checked;

      if (isChecked) {
        const updatedItem = { ...item };
        updatedItem.qty = qty;
        dispatch(fillProduct(updatedItem));
        setIsCheckout(true);
      } else {
        dispatch(removeProduct(item));
        setIsCheckout(false);
      }
    }

    function updateQty(qty_baru) {
      if (isCheckout) {
        const updatedItem = { ...item };
        updatedItem.qty = qty_baru;
        dispatch(updateProduct(updatedItem));
      }
    }

    function handleHapus() {
      dispatch(removeProduct(item));
      setIsCheckout(false);
      console.log(isCheckout);
    }
    return (
      <>
        <div className="w-full flex flex-row justify-between ">
          <div className="flex flex-row gap-5">
            <div class="flex items-center mb-4">
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  checked={isCheckout}
                  disabled={item?.product_variant?.stock < qty}
                  onChange={handleCheckboxChange}
                  class="w-4 h-4 sellf-center  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <img
              className="w-20 h-20 object-cover shadow-lg border self-center border-gray-300"
              onClick={() => router.push(`/product/${item.product_variant.product.id}`)}
              src={item?.product_variant?.product_type?.photo_url ? item?.product_variant?.product_type?.photo_url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Neil image"
            />
            <div className="flex flex-col self-center">
              <div className="text-lg font-bold">{item?.product_variant?.product?.name}</div>
              <div className="text-md font-medium">
                variant : {item?.product_variant?.product_type?.type_name}, {item?.product_variant?.product_size?.size_name}
              </div>
              <div className="text-md font-medium">harga : Rp.{Number(item?.product_variant?.price).toLocaleString("id-ID")}</div>
              <div className="text-sm font-medium">tersisa {item?.product_variant?.stock} item</div>
            </div>
            <div className="relative flex flex-row ms-5 self-center h-10 bg-button border  rounded-sm">
              <button
                className=" h-full px-3 text-gray-600 bg-gray-100 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400"
                onClick={() => {
                  if (qty > 1) {
                    setTotalPrice((qty - 1) * item?.product_variant?.price);
                    setQty(qty - 1);
                    updateQty(qty - 1);
                  }
                }}
              >
                <span className="m-auto text-2xl font-thin">-</span>
              </button>
              <div className="text-md font-bold mx-2 self-center">{qty}</div>
              <button
                className="text-gray-600 px-3 bg-gray-100 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                onClick={() => {
                  if (qty < item?.product_variant?.stock) {
                    setTotalPrice((qty + 1) * item?.product_variant?.price);
                    setQty(qty + 1);
                    updateQty(qty + 1);
                  }
                }}
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div className="text-xl font-bold self-center me-5 justify-self-end"> Rp.{Number(totalPrice).toLocaleString("id-ID")}</div>
        </div>
        <hr class="h-px mx-1 mb-5 mt-5 bg-gray-400 border-0 dark:bg-gray-700" />
      </>
    );
  };

  async function handleDelete() {
    productDetail.map(async (item) => {
      try {
        await deleteCart(user_id, item.id);
      } catch (error) {
        console.log(error);
      }
    });
    dispatch(clearProduct());
  }

  function handleCheckout (){
    if(productDetail.length == 0){
      toast.error("Pilih produk terlebih dahulu", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      router.push("/checkout")
    }
  }

  return (
    <div className="w-full h-auto gap-5 flex flex-row">
      <div className="container w-full bg-white border-2 border-primary rounded-lg mb-5 p-2 mx-auto px-4">
        <h1 className="text-2xl mt-1 font-semibold mb-4">Keranjang Belanja</h1>
        <hr class="h-px bg-primary  border-0 mb-5 dark:bg-gray-700" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            {carts?.map((item) => (
              <CartDetail item={item} />
            ))}
          </div>
        </div>
        <div className="flex justify-end pe-2">
          {productDetail[0] && (
            <button className="py-2 px-4 rounded-md text-white hover:bg-red-800 mb-2 bg-red-600" onClick={handleDelete}>
              hapus
            </button>
          )}
        </div>
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

          <div className="flex justify-between mt-5 mb-2">
            <span>Belum termasuk ongkir</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold"> Rp.{Number(totalHarga).toLocaleString("id-ID")}</span>
          </div>
          {/* <Link href="/checkout"> */}
            <button 
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg mt-4 w-full"
            onClick={()=>handleCheckout()}
            >Checkout</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
