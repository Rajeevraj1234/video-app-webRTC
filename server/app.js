const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdtoEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
  socket.on("join-room", (data) => {
    const { email, roomId } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketIdtoEmailMap.set(socket.id, email);
    io.to(roomId).emit("user-joined", { email, id:socket.id });
    socket.join(roomId);
    io.to(socket.id).emit("join-room", data);
  });
});
