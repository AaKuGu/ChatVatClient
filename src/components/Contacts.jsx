import React, { useEffect, useState } from "react";

const Contacts = ({ currentUser, contacts, setSelectedChat, selectedChat }) => {
  // console.log("props : ", props)

  const [currentUsername, setCurrentUsername] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  });

  // console.log("currentUserImage : ", currentUserImage);
  // console.log("currentUsername : ", currentUsername);

  //     useEffect(() => {
  //       console.log("currentUser.avatarImage", currentUser.avatarImage);
  //       console.log("currentUser.username", currentUser.username);
  //       // console.log("current user in contacts.js file : ", props);
  //     }, []);

  return (
    <div className="w-[30%] rounded-lg flex flex-col items-center justify-between  gap-10 text-white h-full ">
      {/* // ====== branding ========================== */}
      <div
        className="contacts w-full flex flex-col items-center justify-start overflow-y-auto h-full gap-3"
        style={{ backgroundColor: "rgb(1, 1, 97)" }}
      >
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index === selectedChat
                  ? "selected bg-purple-700"
                  : "bg-contacts-rgba"
              } flex items-center justify-start w-full px-4 py-4 gap-5 font-poppins text-xl font-bold cursor-pointer hover:bg-purple-700`}
              key={index}
              onClick={() => setSelectedChat(index)}
              // style={{ backgroundColor: "rgb(1, 1, 60)" }}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatarImage"
                  width={50}
                />
              </div>
              <div className="username">{contact.username}</div>
            </div>
          );
        })}
      </div>
      <div
        className="current-user flex items-center justify-start gap-5 w-full font-bold font-dancing text-3xl px-4 py-4 rounded-lg cursor-pointer"
        style={{ backgroundColor: "rgb(1, 1, 97)" }}
      >
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatarImage"
            width={50}
          />
        </div>
        <div className="username">
          <h1>{currentUsername}</h1>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
