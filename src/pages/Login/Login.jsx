import React, { useEffect, useMemo } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginApi, registerApi } from "../../utils/Api";
import toast, { Toaster } from "react-hot-toast";
import loaderGif from "../../assets/loader.gif";

const Login = ({ setLoader, loader, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const initialValues = {
    username: "pratham",
    password: "12345678",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "username must be at least 3 characters")
      .max(15, "username must not be more than 15 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = async (values) => {
    // const user = await registerApi(values, toast, navigate);
    const user = await loginApi(values, toast, navigate, setIsLoggedIn);
    // console.log("user after api : ", user);
    // if (user.status === 200) {
    // console.log("if arrived")
    // console.log("user.msg", user.msg);
    // toast(user.msg);
    // toast(user.msg);
    // <Navigate to="/login"/>
    // }
  };

  const loginCheck = async () => {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    // console.log("user bolo : ", user);
    if (user) user.avatarImage.length !== 0 && navigate("/chat");
    else setLoader(false);
  };

  useEffect(() => {
    loginCheck();
  });

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
            className="px-10 py-5 flex flex-col items-center justify-center text-white gap-16 rounded-xl min-h-[600px] "
            style={{ backgroundColor: "rgb(1, 1, 97)" }}
          >
            <Toaster />
            <div className="Branding flex items-center justify-center gap-5">
              <div className="flex items-center justify-center ">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  width="100px"
                  style={{
                    boxShadow: "0px 0px 5px 5px blue ",
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
            </div>
            <button
              type="submit"
              className="button px-10 py-3 rounded-lg border-white border-2 text-2xl font-bold font-montserrat hover:bg-blue-500 duration-300 focus:bg-blue-500"
            >
              Login
            </button>
            <Link to="/register" className="qsn text-blue-400 ">
              Don't have an account ? Register Here ...!
            </Link>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default Login;
