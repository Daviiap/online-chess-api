import { server } from "./Server";
import { Server } from "socket.io";
import { v4 } from "uuid";

import { Room } from "./classes/Room";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms: Room[] = [];

io.on("connection", (socket) => {
  console.log("New Connection.");

  socket.on("create-room", (req) => {
    const roomId = v4();

    rooms.push(new Room(roomId, socket.id));

    socket.join(roomId);
    socket.emit("created-room", roomId);
    console.log("created room with id", roomId);
  });

  socket.on("connect-to-room", (roomId) => {
    const room = rooms.find((room) => room.getId() === roomId);

    if (room) {
      if (room.getOwner() !== socket.id) {
        if (room.getMembers().length < 2) {
          socket.join(roomId);
          room.addMember(socket.id);
          socket.emit("connected-to-room", roomId);
        } else {
          socket.emit("connect-to-room-failed", { error: "Sala cheia." });
        }
      } else {
        socket.emit("connect-to-room-failed", {
          error: "Você já está na sala.",
        });
      }
    } else {
      socket.emit("connect-to-room-failed", { error: "Sala não existe." });
    }
  });

  socket.on("leave-room", () => {
    console.log("SASASASSAS");
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        io.to(room).emit("player-disconnected");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000.");
});
