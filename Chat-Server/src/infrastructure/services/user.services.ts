import "dotenv/config"
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
import fs from "fs"
import qs from "qs"
import config from "config"
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
export const addRoom = async (room: string) => {
  console.log("roomy:", room)
  try {
    const resp = await fs.promises.readFile(
      "./src/infrastructure/database/room.ts",
      "utf8"
      // {
      //   content-type: "application/json"
      // }
    )
    // const jsonResponse =  await resp.json()
    console.log("rooms:", resp)
    const [na, roomString, userxroomString] = resp.split("export")
    console.log("array:", roomString, "object:", userxroomString)
    const roomArrray = roomString
      .split("=")[1]
      .replace("[", "")
      .replace("]", "")
      .replace(/\"/g, "")
      .split(",")
      .map((room) => room.trim())
    if (roomArrray.includes(room)) {
      return
    }
    roomArrray.push(room)

    const userXobjectValues = userxroomString.split("=")[1].split(",")
    const indexAdd = userXobjectValues.length - 1
    const newValue = `\r\n  ${room}: new Set()`
    userXobjectValues.splice(indexAdd, 0, newValue)
    const stringObject = userXobjectValues.join(",")
    console.log("2", stringObject)
    // const userXobject2 = eval("(" + userXobjectValues + ")")
    // console.log("fumada2", userXobject2)

    // userXobject2[room] = new Set()
    // console.log(
    //   "array:",
    //   roomArrray,
    //   "object",
    //   userXobject2,
    //   "inter",
    //   userXobject4
    // )
    // Execute the code string to obtain the dynamic JavaScript object
    // const dynamicObject = executeCode()
    const updateArray = `export const rooms = [${roomArrray
      .map((room) => `'${room}'`)
      .join(", ")}]`
    const updateObject = "export let usersXroom = " + stringObject
    // "export let userxroom = " + JSON.stringify(userXobject2, null, 2)
    await fs.promises.writeFile(
      "./src/infrastructure/database/room.ts",
      updateArray + "\n\n" + updateObject
    )
  } catch (err) {
    console.log("error:", err)
    throw new Error("algo uah petado")
  }
}

interface IGoogleTokenResult {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
  // id_token: string
}

export async function getGoogleOauthTokens({
  code,
}: {
  code: string
}): Promise<IGoogleTokenResult> {
  const url = "https://oauth2.googleapis.com/token"

  const values = {
    grant_type: "authorization_code",
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: config.get("googleOauthRedirectUrl"), //FIXME WHAT does config dependency, search every var in whole project?
  }
  console.log("val", values)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(values),
      // body: new URLSearchParams(values).toString(),
    })
    const jsonResponse: IGoogleTokenResult = await res.json()
    return jsonResponse
  } catch (err: any) {
    console.error(err, "Failed to fetch google Oauth Tokens")
    throw new Error(err.message)
  }
}
export interface IGoogleResult {
  id: string
  email: string
  verified_email: string
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export const getGoogleUser = async ({
  token_type,
  access_token,
}: {
  token_type: string
  access_token: string
}) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: { Authorization: `Bearer ${token_type}` },
      }
    )
    const resJson = await response.json()
    return resJson
  } catch (err) {
    console.log(err, "Failed to fetch google user")
    // throw new Error(err.message)
  }
}
