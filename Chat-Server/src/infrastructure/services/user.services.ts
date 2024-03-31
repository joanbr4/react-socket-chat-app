import {
  IdataLogin,
  IdataRegister,
  IdbMessage,
  Imessage,
} from "../../domain/model"
import { Document, Model } from "mongoose"
import { ChatModel, UserModel } from "../database/mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (
  data: IdataRegister
  // data: Document<IdataRegister>
): Promise<void | object> => {
  try {
    console.log("23344", data)
    const { name, surname, nickname, genere, email, password } = data
    await UserModel.create({
      name: name,
      surname: surname,
      nickname: nickname,
      genere: genere,
      email: email,
      password: password,
      date: Date.now(),
    })

    const allUser = await UserModel.find({ email: email })
    console.log("userRegistered", allUser)
  } catch (err) {
    return { mssg: "Error en el registro, ya existe unos datos" }
  }
}

export const login = async (data: IdataLogin) => {
  try {
    const foundUser = await UserModel.findOne({
      email: data.email,
      // $and: [{ email: data.email }, { passw: data.passw }],
    })
    console.log("user:", foundUser)

    if (!foundUser) return { message: "No login match" }

    const isMatch = bcrypt.compareSync(data.passw, foundUser.password)
    if (isMatch) {
      const { _id, name, surname, nickname, genere, email } = foundUser
      const token = jwt.sign(
        { _id, name, surname, nickname, genere, email },
        "secretKey",
        { expiresIn: "2 days" }
      )
      // const token = jwt.sign({ foundUser }, "secretKey", { expiresIn: "1h" })

      return {
        user: { _id, name, surname, nickname, genere, email },
        token: token,
      }
    } else {
      return { mssg: "Error en el password" }
    }
  } catch (err) {
    return { mssg: "Error en los datos de login", err }
  }
}

export const findchat = async (nameRoom: string) => {
  return await ChatModel.findOne({ pair_writers: nameRoom })
}

export const listChats = async (user: string) => {
  const chats = await ChatModel.find({
    pair_writers: { $regex: `\\b${user}\\b`, $options: "i" }, // \\b makes a boundary to a word not just ^ || $ symbol
  })
  // console.log("23Reg", chats)
  const chatName = chats.map((item) => {
    const rowName = item.pair_writers
    // console.log("papa", rowName)
    const name = rowName.split(user).join("").trim() // 1 way
    // const name = rowName.split("").join("").trim() // 1 way
    // const name = rowName.replace(new RegExp(`/${user}/`), "").trim() //FIXME why dont return a regex constructor??
    return name
  })
  // console.log("chats", chats, chatName)
  if (chatName.length > 0) return chatName
  else return []
}

export const createFirstMessage = async (nameRoom: string, message: object) => {
  const newChat = await ChatModel.create({
    pair_writers: nameRoom,
    messages: [message],
  })
}

export const pushMessage = async (room: string, message: Imessage) => {
  const chat = await findchat(room)
  if (chat) {
    chat.messages.push(message)
    await chat.save()
  }
}

export const search = async (query: string) => {
  const users = await UserModel.find()
  // const users = await UserModel.find({ nickname: { $regex: /${query}/ } })
  if (query === "all") {
    const filterUser = users.filter((user) => {
      const { name, surname, nickname, genere } = user
      return user
    })
    const getValueData = filterUser.map(
      ({ name, surname, nickname, genere }) => ({
        name,
        surname,
        nickname,
        genere,
      })
    )
    return getValueData
  } else {
    const filterUser = users.filter((user) => {
      const { name, surname, nickname, genere } = user
      return user.nickname.includes(query)
    })
    const getValueData = filterUser.map(
      ({ name, surname, nickname, genere }) => ({
        name,
        surname,
        nickname,
        genere,
      })
    )
    return getValueData
  }
}

export const createChat = async (room: string) => {
  const newChat = await ChatModel.create({
    pair_writers: room,
    messages: [],
  })
  return newChat.save()
}
