import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import SetAvatar from "./pages/SetAvatar";
import Test from "./pages/Test";

const App = () => {
  const [loader, setLoader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const userCheck = async () => {
  //   const user = await JSON.parse(localStorage.getItem("chat-app-user"));
  //   // console.log("user bolo : ", user);
  //   if (user) user.avatarImage.length !== 0 && navigate("/chat");
  // };

  useMemo(() => {
    // userCheck();
  });
  return (
    <div className="app_container" style={{ backgroundColor: "#000f89" }}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<Register setLoader={setLoader} loader={loader} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setLoader={setLoader}
                loader={loader}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login
                setLoader={setLoader}
                loader={loader}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/setAvatar"
            element={<SetAvatar isLoggedIn={isLoggedIn} />}
          />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
