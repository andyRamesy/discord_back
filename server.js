const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const socketServer = require("./socketServer.ts");
const authRoutes = require("./routes/authRoutes.js");
const PORT = process.env.PORT || process.env.API_PORT;
const app = express();
app.use(express.json());
app.use(cors());

//register routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server)
// server.listen(PORT, () => {
//   console.log(`server listening ${PORT}`);
// });

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
