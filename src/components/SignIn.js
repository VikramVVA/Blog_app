import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../constant/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useToasts } from "react-toast-notifications";

export default function SignIn() {
  const navigate =useNavigate()
  // const {addToast}=useToasts()
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[^A-Z]*$/, "Please enter small letters")
        .trim()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required")
        .trim(),
      password: Yup.string()
        .required("Please Enter Your password")
    }),
    onSubmit: (values) => {
      axios
      .post(`${AppConfig.baseurl}/users/login`, values)
      .then((response) => {
        console.log("sign in successfully", response);
        if(response.data.error === true){ //toast.error(response.data.title)
          toast.error(response.data.title)
        }
       else{
          const token = response.data.token;          ;
          localStorage.setItem("admin_token", token);
          toast(response.data.title)
          window.location.reload();
        }
       
      })
      .catch((error) => {
        console.log("error",error);
        // addToast(error.message,{appearance:'error',autoDismiss:true})
      });
      // console.log("datadatadatadat",values)
      // axios.post("http://localhost:5002/users/login", values
      //   //    {
      //   //     headers: {
      //   //       Authorization: "token " + token,

      //   //     },
      //   //   }
      //     )
      //     .then((res) => {
      //       console.log("response",res);
      //       // formik.resetForm();
      //       // history.push("/");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    },
  });

  return (
    <>
      {/* component */}
      <ToastContainer
               autoClose={3000}/>
    
      <div className="relative  w-full max-w-lg  mx-auto mt-10 bg-blue p-8 rounded-xl shadow shadow-stone-900">
        <h1 className="text-4xl font-medium">Login</h1>
        <p className="text-slate-500">Hi, Welcome back 👋</p>
        <div className="my-5">
          {/* <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" /> <span>Login with Google</span>
          </button> */}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            return false;
          }}
          className="my-10"
        >
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow${formik.touched.email && formik.errors.email
                  ? "border-red-400"
                  : "border-gray-300"
                  }`}
              onChange={formik.handleChange}
              value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
              <div
                  style={{ color: "rgb(220 38 38)" }}
                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
              >
                  {formik.errors.email}
              </div>
          )}               
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow${formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-gray-300"
                  }`}
              onChange={formik.handleChange}
              value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
              <div
                  style={{ color: "rgb(220 38 38)" }}
                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
              >
                  {formik.errors.password}
              </div>
          )}
            </label>
            {/* <div className="flex flex-row justify-between">
              <div>
                <label htmlFor="remember" className>
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a href="/" className="font-medium text-indigo-600">
                  Forgot Password?
                </a>
              </div>
            </div> */}
            <button 
            type="submit"
            className="w-full mt-5 py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
          
          </div>
        </form>
      </div>
    
    </>
  );
}
