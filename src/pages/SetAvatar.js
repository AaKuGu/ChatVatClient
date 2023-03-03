import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import walk
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarApi, validateAvatar } from "../utils/Api";
import { toast } from "react-hot-toast";

const SetAvatar = ({ isLoggedIn }) => {
  // console.log(`===================================`);

  // console.count("rendering numbers : ");

  const navigate = useNavigate();

  const [avatars, setAvatars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [serverError, setServerError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedAvatar === undefined) toast.error("Please select an avatar");
    else {
      toast.success("Avatar Selected ...!");
      setAvatarApi(selectedAvatar, avatars, isLoggedIn);
      navigate("/login");
    }
  };

  const avatarCheck = async () => {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    // console.log("user bolo : ", user);
    if (user) user.avatarImage.length !== 0 && navigate("/chat");
  };

  useEffect(() => {
    avatarCheck();

    // console.log("useEffect running");
    // const localStoreData = JSON.parse(localStorage.getItem("chat-app-user"));

    // console.log("localStoreData in SetAvatar : ", localStoreData);

    // localStoreData.avatarImage.length !== 0 && navigate("/chat");

    // console.count("useEffect runs");
    validateAvatar(setAvatars, Buffer);
  }, []);

  useEffect(() => {
    avatars && setIsLoading(false);
    setTimeout(() => {
      setServerError(true);
      console.log("server error status : ", serverError);
    }, 10000);
  });

  console.log("loadig status : ", isLoading);

  useEffect(() => {
    // serverError && isLoading ? navigate("/setAvatar"),toast(""): null
    if (serverError && isLoading) {
      console.log("inside the serverError and isLoading");
      toast.error("Server Error, Check internet connection or set Avatar again");
      setServerError(false);
      navigate("/setAvatar");
    }
  }, [serverError]);

  console.log("avatars hia ye : ", avatars);

  return (
    <div className="container h-full text-white w-full flex items-center justify-center relative">
      {isLoading ? (
        <div className="absolute">
          <img src={loader} alt="" width={200} />
        </div>
      ) : (
        <form
          action=""
          className="h-full w-full items-center justify-center flex-col gap-10 flex"
          onSubmit={submitHandler}
        >
          <div className="title font-montserrat font-bold text-white text-4xl">
            Pick an Avatar as your profile picture
          </div>
          <div className="avatars flex gap-x-16 ">
            {avatars &&
              avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      selectedAvatar === index ? "selected border-2" : ""
                    } cursor-pointer hover:border-2 px-10 py-1 rounded-full relative flex items-center justify-center w-[100px] h-[100px] duration-100  `}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      width={100}
                      onClick={() => setSelectedAvatar(index)}
                      className="absolute  w-full h-full px-2 py-2 rounded-full "
                    />
                  </div>
                );
              })}
          </div>
          <button
            type="submit"
            className="px-7 py-3 text-xl font-poppins mt-10 hover:bg-blue-300 duration-300 hover:text-black rounded-lg border-2 font-bold"
          >
            Set as Profile Pic
          </button>
        </form>
      )}
    </div>
  );
};

export default SetAvatar;
