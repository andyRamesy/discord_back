import { Socket } from "socket.io";

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("user connected");
    console.log(socket.id, " : socket id");
  });
};

module.exports = {registerSocketServer}