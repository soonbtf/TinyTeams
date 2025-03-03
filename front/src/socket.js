import { reactive, toRaw } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  newPost: [],
  newFollow: [],
  newLike: [],
  newComment: [],
  newMessage: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000/";

export const socket = io(URL);

// const sound = new Audio("../../public/notificationSound.mp3");

socket.on("connection", () => {
  state.connected = true;
});

socket.on("notifFollow", (arg) => {
  state.newFollow.unshift(arg);
});

socket.on("notifPost", (arg) => {
  state.newPost.unshift(arg);
});

socket.on("notifLike", (arg) => {
  state.newLike.unshift(arg);
});

socket.on("notifComment", (arg) => {
  state.newComment.unshift(arg);
});

socket.on("notifMessage", (message, conversationUpdated) => {
  state.newMessage.length = 0;
  state.newMessage.unshift(message, conversationUpdated);
});
