import { useRouter } from "next/navigation";
import { login } from "@/modules/fetch/user";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  // useEffect(() => {
  //   // Mengambil data cookie
  //   const myCookieValue = Cookies.get("access_token");
  //   console.log(myCookieValue);
  // }, []);
  const { push } = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.elements.email.value;
    const pass = event.target.elements.password.value;

    try {
      console.log(email);
      const response = await login(email, pass);
      console.log(response.data.status);
      if (response.data.status == "error") {
        toast.error("username or passoword wrong", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.data.id);
      }
      event.target.reset();

      toast.success("success Login", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      setTimeout(() => {
        push("/");
      }, 2000);
    } catch (error) {
      toast.error("username or passoword wrong", {
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
    <div className="flex justify-center mx-auto w-full ">
      <div class="w-full max-w-lg mx-auto p-4 bg-white border flex flex-col border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
        <form class="w-full space-y-6" action="#" onSubmit={handleSubmit}>
          <div class="text-xl w-full mx-auto item-center font-bold text-gray-900 dark:text-white text-center">Sign In </div> {/* Menambahkan text-center di sini */}
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500">
              Create account
            </a>
          </div>
        </form>
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default LoginForm;
