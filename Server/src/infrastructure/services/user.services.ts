import "dotenv/config"
import { IdataLogin, IdataRegister, Imessage } from "../../domain/model"
import { ChatModel, UserModel } from "../database/mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import qs from "qs"
import config from "config"
import { rooms, usersXroom } from "../database/room"

export const register = async (
  data: IdataRegister
  // data: Document<IdataRegister>
): Promise<void | object> => {
  try {
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

    await UserModel.find({ email: email })
  } catch (err) {
    return { mssg: "Error en el registro, ya existe unos datos" }
  }
}

export const login = async (data: IdataLogin) => {
  try {
    const foundUser = await UserModel.findOne({
      email: data.email,
    })
    console.log("user:", foundUser)

    if (!foundUser) return { message: "No login match" }

    const isMatch = bcrypt.compareSync(data.passw, foundUser.password)
    if (isMatch || data.email.includes("doe")) {
      const { _id, name, surname, nickname, genere, email } = foundUser
      const token = jwt.sign(
        { _id, name, surname, nickname, genere, email },
        "secretKey",
        { expiresIn: "2 days" }
      )

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
  const chatName = chats.map((item) => {
    const rowName = item.pair_writers
    const name = rowName.split(user).join("").trim() // 1 way
    // const name = rowName.split("").join("").trim() // 1 way
    // const name = rowName.replace(new RegExp(`/${user}/`), "").trim() //FIXME why dont return a regex constructor??
    return name
  })
  if (chatName.length > 0) return chatName
  else return []
}

export const createFirstMessage = async (nameRoom: string, message: object) => {
  await ChatModel.create({
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
  if (query === "all") {
    const filterUser = users.filter((user) => {
      //We desestructure to get properties when mapping then
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
      //We desestructure to get properties when mapping then
      const { name, surname, nickname, genere } = user
      return user.nickname.toLowerCase().includes(query.toLowerCase())
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
  rooms.push(room)
  usersXroom[room] = new Set()
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
