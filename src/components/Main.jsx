import React from "react";

const Main = ({ messages }) => {
  console.log("messages", messages);
  return (
    <div className="h-full w-full flex flex-col gap-3 justify-start overflow-y-auto">
      {messages.map((message) => {
        return (
          <div
            className={`w-full flex items-center ${
              message.fromSelf ? "justify-end" : "justify-start"
            } px-2`}
          >
            <div
              className={`message ${
                message.fromSelf ? "bg-green-700 text-right" : "bg-blue-700"
              }  w-fit px-2 py-2 rounded-lg`}
            >
              {message.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
