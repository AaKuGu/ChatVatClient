import React, { useEffect, useRef, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { getAllMessagesApi, postMessagesApi } from "../utils/Api";
import Main from "./Main";
import { v4 as uuid4 } from "uuid";

const SelectedChat = ({ selectedChat, contacts, currentUser, socket }) => {
  console.log("==================================");
  console.count("selected chat , rerendered :");

  const [msg, setMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [picker, setPicker] = useState(false);

  const scrollRef = useRef();
  const sendToApi = {
    selectedChat,
    currentUser,
    contacts,
    msg,
    setMessages,
  };

  const navigate = useNavigate();
  console.log("selected chat in selectedChat abhi : ", selectedChat);
  //   console.log("contacts in selectedChat abhi : ", contacts);
  console.log("contacts[selectedChat] : ", contacts[selectedChat].username);
  console.log("current user in selectedChat abhi : ", currentUser.username);

  const handleEmoji = (emoji) => {
    setMsg(msg + emoji.emoji);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("message in SelectedChat : ", msg);
    postMessagesApi(sendToApi);
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: contacts[selectedChat]._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    console.log("msgs in selectedChat : ", msgs);
    setMessages(msgs);
    setMsg("");
  };

  console.log("msg from backend ho halla : ", messages);

  useEffect(() => {
    if (socket.current) {
      console.log("socket . current is runnig : ", socket.current);
      socket.current.on("msg-receive", (msg) => {
        // console.log("msg from backend ho halla : ", message);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    // console.log("first")
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    selectedChat && getAllMessagesApi(sendToApi);
  }, [selectedChat]);
  console.log("msg", msg);

  useEffect(() => {
    console.log("this useEffect is running");
    getAllMessagesApi(sendToApi);
  }, []);
  return (
    <div
      className="w-full h-full flex flex-col items-center px-2 py-2 justify-center text-white gap-2"
      style={{ backgroundColor: "rgb(1, 1, 97)" }}
    >
      <header className="w-full text-4xl bg-blue-900 h-[13%] flex items-center justify-between px-2 py-2 ">
        <div className="brand  flex items-center justify-center w-auto gap-5 py-5">
          <img
            src={`data:image/svg+xml;base64,${contacts[selectedChat].avatarImage}`}
            className=""
            width={60}
            alt=""
          />
          <div className="name font-bold font-dancing">
            {contacts[selectedChat].username}
          </div>
        </div>
      </header>
      <Main messages={messages} />
      <form
        onSubmit={submitHandler}
        className="w-full text-4xl h-[13%] gap-5 flex items-center justify-between px-2 py-2 "
      >
        <button
          className="emoji relative flex items-center justify-center "
          type="button"
        >
          {picker && (
            <div className="absolute bottom-[120%] ">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
          {/* <div className="bg-red-500 w-[200px] h-[200px] absolute bottom-[100%]">hola</div> */}
          <BsEmojiSmile
            className=" bg-yellow-500 text-black rounded-full"
            onClick={() => setPicker(!picker)}
            style={{ boxShadow: "0 0 10px 2px yellow" }}
          />
        </button>
        <div className="input w-full  flex items-center bg-blue-900 h-full px-5 py-2">
          <input
            type="text"
            className="outline-none cursor-pointer py-1 bg-transparent border-none w-full text-2xl"
            placeholder="Type something to send ..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onClick={() => setPicker(false)}
          />
        </div>
        <button className="send " type="submit">
          <IoMdSend className="text-green-500" />
        </button>
      </form>
    </div>
  );
};

export default SelectedChat;
