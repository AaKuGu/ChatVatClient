import React, { useEffect, useRef, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ActualChat from "../../components/ActualChat";
import Contacts from "../../components/Contacts";
import { getAllUsersApi } from "../../utils/Api";
import { io } from "socket.io-client";
import { backendUrl } from "../../utils/Api";

const Chat = () => {
  const socket = useRef();

  const [currentUser, setCurrentUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(undefined);

  const navigate = useNavigate();

  // console.log("current user in chata.jsx is : ", currentUser);
  console.log("selected chat in chata.jsx is : ", selectedChat);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(backendUrl);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const localStoreData = localStorage.getItem("chat-app-user");
    localStoreData === null && navigate("/");
    const ObjectForm = JSON.parse(localStoreData);
    ObjectForm.avatarImage === "" && navigate("/setAvatar");
    // console.log("object form : ", ObjectForm)
    setCurrentUser(ObjectForm);
    getAllUsersApi(setContacts);
  }, []);

  // useEffect(() => {
  //   console.log("currentUser", currentUser);
  // });

  return (
    <div className=" w-full flex flex-col items-start justify-center px-5 py-0 h-full ">
      {/* {currentUser} */}
      <header className="w-full min-h-[10%] text-white flex items-center justify-between px-5 py-1 rounded-lg border-2 border-white">
        <div className="brand  w-[250px] h-full flex items-center justify-center gap-5   ">
          <div className="flex items-center justify-center ">
            <img
              src="/images/logo.png"
              alt="logo"
              width="70px"
              style={{
                boxShadow: "0px 0px 5px 5px blue ",
                minHeight: "50px",
              }}
              className="px-1 py-1"
            />
          </div>
          <div className="text-4xl font-bold font-dancing">Chat Vat</div>
        </div>
        <button
          className="logout text-white px-1 py-1 rounded-lg  text-3xl bg-purple-600"
          onClick={() => {
            const decision = window.confirm("Are you sure you want to Logout?");
            console.log("decision : ", decision);
            if (decision) {
              localStorage.clear();
              navigate("/");
            }
          }}
        >
          <RiLogoutCircleLine />
        </button>
      </header>

      <div className="belowHeader w-full h-[85%] flex items-center justify-between border-2 py-4 rounded-lg px-5 gap-3">
        <Contacts
          currentUser={currentUser}
          contacts={contacts}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />

        <div className="actualChat w-full h-full">
          <ActualChat
            currentUser={currentUser}
            selectedChat={selectedChat}
            contacts={contacts}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
