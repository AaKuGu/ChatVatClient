import React from "react";
import halloGif from "../assets/final hallo.gif";

const HalloChat = ({ currentUser, selectedChat }) => {
  return (
    <div
      className="w-full h-full text-white flex items-center justify-center "
      style={{ backgroundColor: "rgb(1, 1, 97)" }}
    >
      <img src={halloGif} alt="img tha" width={500} />
      <div className="texts flex flex-col items-center justify-center gap-5">
        <div className="header font-dancing text-7xl">
          Hallo {currentUser && currentUser.username}
          {/* {currentUser.username === undefined ? (
            <div>Undefined</div>
          ) : (
            <div>{currentUser.username}</div>
          )} */}
        </div>
        <div className="desc text-3xl">
          Please select a chat to Start Messaging ...!
        </div>
      </div>
    </div>
  );
};

export default HalloChat;
