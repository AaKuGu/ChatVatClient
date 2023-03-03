import React, { useEffect } from "react";
import HalloChat from "./HalloChat";
import SelectedChat from "./SelectedChat";

const ActualChat = ({ currentUser, selectedChat, contacts, socket }) => {
  // const [showHalloChat, setShowHalloChat] = useState(false);
  console.log("current User : ", currentUser);

  useEffect(() => {
    // selectedChat === undefined
    //   ? setShowHalloChat(true)
    //   : setShowHalloChat(false);
  });
  return (
    <>
      {selectedChat === undefined ? (
        <HalloChat currentUser={currentUser} selectedChat={selectedChat} />
      ) : (
        <SelectedChat
          selectedChat={selectedChat}
          contacts={contacts}
          currentUser={currentUser}
          socket={socket}
        />
      )}
    </>
  );
};

export default ActualChat;
