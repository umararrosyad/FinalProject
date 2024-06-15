import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setSideLocation } from "@/store/reducers/sideLocation";
import React, { useEffect, useState } from "react";
import { getAllGalleries, createGalleries, deleteGalleries } from "../modules/fetch/galleries";
import { useRouter } from "next/router";


const Navbar = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.sidebar.sideLocation);
  const [galleries, setGalleries] = useState();
  const router = useRouter();
  const { id } = router.query;

  const [showModal, setShowModal] = useState(false);

  const handleAsideClick = (location) => {
    dispatch(setSideLocation(location));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllGalleries(id);
        console.log(response.status);
        if (response.status == "error") {
          setGalleries(null);
        } else {
          setGalleries(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [showModal]);

  const Card = (item) => {
    async function handleClick(galleries_id) {
      try {
        const response = await deleteGalleries(id, galleries_id);
        console.log(response);
        toast.success("success created data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        const fetchProducts = async () => {
          try {
            const response = await getAllGalleries(id);
            console.log(response.status);
            if (response.status == "error") {
              setGalleries(null);
            } else {
              setGalleries(response.data);
            }
          } catch (e) {
            console.log(e);
          }
        };
        fetchProducts();
      } catch (error) {
        toast.success("success delete data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
    console.log(item);
    return (
      <>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative group">
          <a>
            <div className="flex justify-center w-full p-2">
              <img className="rounded-t-lg object-contain" style={{ height: "200px", objectFit: "cover" }} src={item?.item?.photo_url} alt="" />
            </div>
          </a>

          <div className="flex text-white flex-row gap-2 px-2 pb-2">
            <div
              onClick={() => handleClick(item?.item?.id)}
              className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium bg-red-900 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            >
              <svg className="w-20 h-20 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Modal = () => {
    const [selectedImage, setSelectedImage] = useState();

    async function handleSubmit(event) {
      event.preventDefault();

      if (!selectedImage) {
        toast.error("Please select image", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        return;
      }
      const formData = new FormData();
      formData.append("image", event.target.elements.image.files[0]);
      try {
        const response = await createGalleries(id, formData);
        console.log(response);
        setSelectedImage();
        setShowModal(false);

        toast.success("success created data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } catch (error) {
        toast.success("success updated data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }

    return (
      <>
        <div id="authentication-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative mt-6 w-full max-w-lg max-h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-gray-700 border-black border-2 rounded-lg shadow-lg dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-white dark:text-white">Input Gambar</h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div class="p-4 md:p-5">
                <form class="space-y-4" action="#" onSubmit={handleSubmit}>
                  <label class="block mb-2 text-sm font-medium text-white dark:text-white" for="file_input">
                    Upload file
                  </label>
                  <div class="flex justify-center">{selectedImage ? <img className="rounded-lg object-contain" src={selectedImage} alt="Selected Image" style={{ maxWidth: "500px", height: "300px", objectFit: "cover" }} /> : null}</div>
                  <input
                    class="block w-full text-sm text-gray-900 -mt-10 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                    }}
                  />
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    submit
                    {/* {category.category ? "Update" : "Create"} */}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div class="p-6 mb-10 h-auto bg-gray-800 text-medium text-gray-100 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4">
          <div className="w-full md:w-1/2">
            <div class="block -mt-3 text-2xl font-medium text-white dark:text-white">PRODUCTS GALLERIES</div>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="bg-blue-700 flex items-center mx-1 justify-center text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add Galleries
            </button>
          </div>
        </div>

        {showModal && <Modal />}

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleries?.map((gallery) => (
            <div>
              <Card item={gallery} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
