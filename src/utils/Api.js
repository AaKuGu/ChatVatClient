import axios from "axios";

export const backendUrl = "http://localhost:8000/";
const registerRoute = "http://localhost:8000/api/auth/register";
const loginRoute = "http://localhost:8000/api/auth/login";
const setAvatarRoute = "http://localhost:8000/api/auth/setAvatar";
const setAvatarApiRoute = "https://api.multiavatar.com/45678945";
const getAllUsersApiRoute = "http://localhost:8000/api/auth/getAllUser";
const postMessagesApiRoute = "http://localhost:8000/api/message/postMessages";
const getAllMessagesApiRoute = "http://localhost:8000/api/message/getMessages";

export const registerApi = async (
  { username, email, password },
  toast,
  navigate
) => {
  try {
    const getUser = await axios.post(registerRoute, {
      username,
      email,
      password,
    });

    if (getUser.data.status === true) {
      console.log("data sending to register is : ", getUser.data.data);
      toast.success(getUser.data.msg);
      localStorage.setItem("chat-app-user", JSON.stringify(getUser.data.data));
      navigate("/setAvatar");
      return getUser.data.data;
    } else {
      //   console.log("data sending to register is : ", getUser.data);
      toast.error(getUser.data.msg);
      return getUser.data;
    }
    // return getUser;
    console.log(`user from registerApi in public is : `, getUser.data);
  } catch (error) {
    console.log(`error in registerApi in public: ${error}`);
  }
};

export const loginApi = async (
  { username, password },
  toast,
  navigate,
  setIsLoggedIn
) => {
  try {
    const getUser = await axios.post(loginRoute, {
      username,
      password,
    });

    const { data } = await getUser;

    console.log(data);

    if (data.status === true) {
      // console.log("data sending to register is : ", getUser.data.user);
      toast.success(data.msg);
      setIsLoggedIn(true);
      if (localStorage.getItem("chat-user-app") === null) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      //   localStorage.setItem("chat-app-user", getUser.data.user);
      navigate("/chat");
      return getUser.data.data;
    } else {
      //   console.log("data sending to register is : ", getUser.data);
      toast.error(getUser.data.msg);
      return getUser.data;
    }
    return getUser;
    console.log(`user from registerApi in public is : `, getUser.data);
  } catch (error) {
    console.log(`error in registerApi in public: ${error}`);
  }
};

export const validateAvatar = async (setAvatars, Buffer) => {
  try {
    // console.count("Api Calls : ");

    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${setAvatarApiRoute}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));

      // console.log("for loop runs successfully");
      // console.log("for loop data is : ", data);
    }
    setAvatars(data);
  } catch (error) {
    console.log(
      `the error occured in setAvatarApi in api.js in public: ${error}`
    );
  }
};

export const setAvatarApi = async (selectedAvatar, avatars, isLoggedIn) => {
  try {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));

    await localStorage.removeItem("chat-app-user");
    // console.log("user in setAvatarApi", user);
    const data = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    console.log("hallo bhaii data.data.data", data.data.data);
    isLoggedIn &&
      localStorage.setItem("chat-app-user", JSON.stringify(data.data.data));

    // console.log("data in setAvatarApi", data.data.data);
  } catch (error) {
    console.log(
      `the error occured in setAvatarApi in api.js in public: ${error}`
    );
  }
};

export const getAllUsersApi = async (setContacts) => {
  try {
    const users = await axios.get(getAllUsersApiRoute);
    console.log("users in getAllUsersApi : ", users.data.user);
    setContacts(users.data.user);
    // return users.data.user;
  } catch (error) {
    console.log(
      `the error occured in getAllUsersApi in api.js in public: ${error}`
    );
  }
};

export const postMessagesApi = async ({
  currentUser,
  selectedChat,
  contacts,
  msg,
}) => {
  try {
    // console.log("current user in api.js : ", currentUser);
    // console.log("selected chat in api.js : ", selectedChat);
    // console.log("contacts in api.js : ", contacts[selectedChat]);
    const data = await axios.post(postMessagesApiRoute, {
      from: currentUser._id,
      to: contacts[selectedChat]._id,
      message: msg,
    });

    console.log(`data in postMessagesApi is `, data);
  } catch (error) {
    console.log(
      `error occured in postMessagesApi in api.js in public: ${error}`
    );
  }
};

export const getAllMessagesApi = async ({
  currentUser,
  selectedChat,
  contacts,
  setMessages,
}) => {
  try {
    // console.log("current user in api.js : ", currentUser);
    // console.log("selected chat in api.js : ", selectedChat);
    // console.log("contacts in api.js : ", contacts[selectedChat]);
    const data = await axios.post(getAllMessagesApiRoute, {
      from: currentUser._id,
      to: contacts[selectedChat]._id,
    });

    if (data) setMessages(data.data.data);

    // console.log(`data in getMessagesApi is `, data);
    // console.log(`data.data in getMessagesApi is `, data.data.data);
  } catch (error) {
    console.log(
      `error occured in getMessagesApi in api.js in public: ${error}`
    );
  }
};
