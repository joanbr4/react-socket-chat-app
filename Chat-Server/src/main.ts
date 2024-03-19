import "dotenv/config"
import express from "express"
import router from "./infrastructure/routes/express-router"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
// import { client } from "./infrastructure/database/mongoose"
import mongoose from "mongoose"
import { IdbMessage } from "./domain/model"

const {
  PORT: port,
  ME_CONFIG_MONGODB_ADMINUSERNAME: root,
  ME_CONFIG_MONGODB_ADMINPASSWORD: example,
  ME_CONFIG_MONGODB_URL: docker_uri_express,
  ME_INITDB_MONGODB_URL: docker_uri_mongo,
} = process.env

const app = express()
const server = createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const io = new Server(server)
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:4000",
  },
  transports: ["websocket"],
})
let userChatting = 0

let chat: IdbMessage[] = []
app.use("/api", router)

const rooms = ["general", "cultural", "deportes"]

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  //Al socket del cliente lo vincualamos a una room que viene desde el cliente
  socket.on("room", (room) => {
    socket.join(room)
    console.log(`user": ${socket.id} has joinned to ${room} room`)
  })

  socket.on("chat", (data) => {
    const { message, room, apodo } = data

    console.log(`msg: ${message}, room: ${room}, user: ${apodo}`)

    const roomExisted = chat.findIndex((item) => item.room === room)
    if (roomExisted == -1)
      chat.push({ room: room, messages: [{ msg: message, user: apodo }] })
    else chat[roomExisted].messages.push({ msg: message, user: apodo })

    console.log("Array:", chat)

    const roomIndex = chat.findIndex((item) => item.room === room)
    io.to(room).emit(`room-${room}`, {
      // text: message,
      text: chat[roomIndex].messages,
      user: apodo,
      // room: room,
    }) //send noti to ourselves with io.in()
    // socket.to(room).emit("chat", listMessage);// not send noti to ourselves with socket.in()
  })

  socket.on("disconnect", (name_room) => {
    // userChatting--;
    if (!rooms.includes(name_room)) {
      socket.leave(name_room)
      // {io.emit("list chatters", userChatting);
      console.log("room closed")
    }
  })
})

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
