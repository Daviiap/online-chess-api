import { server } from "./Server";
import { Server } from "socket.io";

import { Map } from "./classes/Map";
import { Player } from "./classes/Player";

import { MoveEvent } from "./interfaces/MoveEvent";
import { Fruit } from "./classes/Fruit";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const map = new Map(20, 20);

io.on("connection", (socket) => {
  console.log("New Connection.");

  const player = new Player(0, 0, "PLAYER", socket.id);
  const fruit = new Fruit(12, 5, socket.id);
  map.addPlayer(player);
  map.addFruit(fruit);

  socket.emit("load", map);
  socket.broadcast.emit("update", map);

  socket.on("move", (event: MoveEvent) => {
    const { playerId, direction } = event;
    map.movePlayer(playerId, direction);
    socket.broadcast.emit("move-player", { playerId, direction });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
    map.removePlayer(player.getId());
    io.emit("update", map);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000.");
});
