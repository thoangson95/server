const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost",
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

const port = 1999; // Thay đổi số cổng tùy ý

io.on("connection", (socket) => {
    console.log("New user connected");

    // Xử lý sự kiện khi nhận được tin nhắn
    socket.on("chat message", (message) => {
        console.log("Message:", message);

        // Gửi tin nhắn đến tất cả các client đang kết nối
        io.emit("chat message", message);
    });

    // Xử lý sự kiện khi ngắt kết nối
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
