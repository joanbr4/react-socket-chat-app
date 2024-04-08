import "dotenv/config";
import express from "express";
import router from "./infrastructure/routes/express-router";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { IDTOsocket } from "./domain/model";
import {
  addRoom,
  createFirstMessage,
  findchat,
  pushMessage,
} from "./infrastructure/services/user.services";
import { rooms, usersXroom } from "./infrastructure/database/room";

const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:4000",
  },
  transports: ["websocket"],
});

app.use("/api", router);

io.on("connection", (socket) => {
  //Socket to count live users
  socket.on("count Users", async (data) => {
    console.log("fromClient", data);
    const { room, finalnickname, status } = data;
    if (!rooms.includes(room)) {
      await addRoom(room);
      console.log(rooms);
    }
    const roomKey = room as keyof typeof usersXroom; //assert room is a key of object
    const usersData = Array.from(usersXroom[roomKey]);
    const num = usersData.length;
    console.log("pre", usersData, "total:", num);

    if (finalnickname != "" && status) {
      usersXroom[roomKey].add(finalnickname);
      const usersData = Array.from(usersXroom[roomKey]);
      const num = usersData.length;
      console.log("post", usersData, "total:", num);
      io.emit("count Users", num);
    } else {
      usersXroom[roomKey].delete(finalnickname);
      const usersData = Array.from(usersXroom[roomKey]);
      const num = usersData.length;
      io.emit("count Users", num);
    }
  });

  //reflecting from public socket to public socket
  socket.on("public-chat", (msg: IDTOsocket) => {
    console.log(msg);
    const { message, room, apodo } = msg;
    io.emit(`public-${room}`, { message, apodo }); //io. let send to ourselve and everyone
  });

  //Al socket del cliente lo vincualamos a una room que viene desde el cliente
  socket.on("private-chat", (nameRoom) => {
    // console.log("private", nameRoom)
    socket.join(nameRoom);
  });

  //Private socket of clients
  socket.on("chatting", async (data) => {
    const { message, room, writer } = data;

    const dataToInsert = { writer: writer, message: message };
    const checkChat = await findchat(room);

    if (!checkChat) {
      console.log("chat created!");
      await createFirstMessage(room, dataToInsert);
    } else {
      await pushMessage(room, dataToInsert);
      const chat = await findchat(room);
      console.log("ch", chat);
    }

    // socket.to(room).emit("chat", listMessage);// not send noti to ourselves with socket.in()
    io.to(room).emit(`${room}`, {
      message: message,
      writer: writer,
    }); //send noti to ourselves with io.in()
  });

  socket.on("disconnect", (name_room) => {
    if (!rooms.includes(name_room)) {
      socket.leave(name_room);
      console.log("room closed");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
