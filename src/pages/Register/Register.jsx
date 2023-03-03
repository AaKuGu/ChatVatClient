import React, { useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApi } from "../../utils/Api";
import toast, { Toaster } from "react-hot-toast";
import loaderGif from "../../assets/loader.gif";

const Register = ({ loader, setLoader }) => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);

  console.log("loader value at start", loader);

  const initialValues = {
    username: "pratham",
    email: "prathamtogupta11@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "username must be at least 3 characters")
      .max(15, "username must not be more than 15 characters"),
    email: Yup.string().required("Email is required").email(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Your Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onSubmit = async (values) => {
    const user = await registerApi(values, toast, navigate);

    // console.log("user after api : ", user);
    // console.log("if arrived")
    // console.log("user.msg", user.msg);
    // toast(user.msg);
    // toast(user.msg);
    // <Navigate to="/login"/>
    // console.log("form values are : ", values);
  };

  const registerCheck = async () => {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    console.log("user bolo : ", user);
    if (user) {
      user.avatarImage.length !== 0 && navigate("/chat");
      console.log("Loader in register : ", loader);
    } else {
      console.log("else is running");
      setLoader(false);
    }
    console.log("Loader in register before loaderSet: ", loader);
    console.log("Loader in register after loaderSet: ", loader);
  };

  console.log("loader value after registerCheck", loader);

  useEffect(() => {
    console.log("register loader is running ...");
    registerCheck();
    console.log("loader value in useEffect is " + loader);
    // console.log("localStorage in useEffect of Register.jsx : ", localStoreData);
    // localStoreData && localStoreData.avatarImage.length === 0
    //   ? navigate("/setAvatar")
    //   : navigate("/chat");
    // if (localStoreData.avatarImage) navigate("/chat");
  }, []);

  useEffect(() => {
    setRerender(!rerender);
  }, [setRerender]);

  return (
    <>
      {loader ? (
        <div>
          <img src={loaderGif} alt="loader" />
        </div>
      ) : (
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          <Form
            className="px-10 py-10 flex flex-col items-center justify-center text-white min-h-[600px] gap-16 rounded-lg"
            style={{ backgroundColor: "rgb(1, 1, 97)" }}
          >
            <div className="Branding flex  items-center justify-center gap-5">
              <div className="flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  width="100px"
                  style={{
                    boxShadow: "0px 0px 5px 5px yellow ",
                    minHeight: "70px",
                  }}
                  className="px-1 py-1"
                />
              </div>
              <div className="text-7xl font-bold font-dancing">Chat Vat</div>
            </div>
            <div className="fields w-full h-full flex flex-col items-center justify-center gap-3 ">
              <div className="username w-full  h-full flex items-center justify-center relative">
                <Field
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="outline-none border-2 border-white rounded-lg px-5 font-roboto py-3 w-full bg-transparent"
                />
                <div className="absolute top-0 left-[101%] flex items-center justify-start  w-[50%]">
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="bg-red-500 px-5 py-2 border-2 rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="email w-full h-full flex items-center justify-center relative">
                <Field
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="outline-none border-2 border-white rounded-lg px-5 font-roboto py-3 w-full bg-transparent active:bg-red-500 "
                />
                <div className="absolute top-0 left-[101%] flex items-center justify-start  w-[50%]">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="bg-red-500 px-5 py-2 border-2 rounded-lg  w-full"
                  />
                </div>
              </div>
              <div className="password w-full h-full flex items-center justify-center relative">
                <Field
                  name="password"
                  id="password"
                  placeholder="Password"
                  type="password"
                  className="outline-none border-2 border-white rounded-lg px-5 font-roboto py-3 w-full bg-transparent"
                />
                <div className="absolute top-0 left-[101%] flex items-center justify-start  w-[50%]">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="bg-red-500 px-5 py-2 border-2 rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="confirmPassword w-full h-full flex items-center justify-center relative">
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="password"
                  type="password"
                  className="outline-none border-2 border-white rounded-lg px-5 font-roboto py-3 w-full bg-transparent"
                />
                <div className="absolute top-0 left-[101%] flex items-center justify-start  w-[50%]">
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="bg-red-500 px-5 py-2 border-2 rounded-lg  w-full"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button px-10 py-3 rounded-lg border-white border-2 text-2xl font-bold font-montserrat hover:bg-blue-500 duration-300 focus:bg-blue-500"
            >
              Create
            </button>
            <Link to="/login" className="qsn text-blue-400 ">
              Already have an account ? Login ...!
            </Link>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default Register;
