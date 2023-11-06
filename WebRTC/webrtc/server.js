const fs = require("fs");
const https = require("https");
const express = require("express");
const socketIo = require("socket.io");

const app = express();

const privateKey = fs.readFileSync(
  "C:/Users/x/Desktop/fp/Bridge_web_service/WebRTC/webrtc/cert/192.168.240.155+1-key.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "C:/Users/x/Desktop/fp/Bridge_web_service/WebRTC/webrtc/cert/192.168.240.155+1.pem",
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

const io = socketIo(server, {
  cors: {
    origin: [
      "https://localhost:3000",
      "https://192.168.240.155:3000",
      "https://localhost:3000",
      "https://192.168.240.155:3001",
    ], // 'http'와 'https' 둘 다 허용
    methods: ["GET", "POST"],
    credentials: true, // CORS 요청 시 인증 정보를 허용
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});