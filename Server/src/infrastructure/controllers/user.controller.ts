import { Request, Response } from "express"
import { IdataLogin } from "../../domain/model"
import * as userServices from "../services/user.services"
import jwt from "jsonwebtoken"
import config from "config"
import { OAuth2Client } from "google-auth-library"

export const loginOne = async (req: Request, res: Response) => {
  const data: IdataLogin = req.body.datos
  console.log(req.body)
  if (!data) {
    res.status(404).send("Volver a empezar")
  }

  const queryUser = await userServices.login(data)
  if (queryUser?.user == undefined) {
    res.status(404).send("Not valid login")
  } else {
    res.cookie("token", queryUser?.token, {
      // httpOnly: true,
      // withCredentials: true,
    })
    res.cookie(
      "dataUser",
      // `${queryUser.foundUser.email}`,
      JSON.stringify(queryUser?.user)
    )
    res.status(200).send(queryUser)
    // res.status(200).send({ queryUser, msg: "Logged in" });
  }
}

export const logoutOne = async (req: Request, res: Response) => {
  res.clearCookie("dataUser")
  res.status(200).send({ msg: "Logged out" })
}

export const registerOne = async (req: Request, res: Response) => {
  try {
    const { name, surname, nickname, genere, email, password } = req.body.data

    await userServices.register(req.body.data)
    res.status(200).send("Registered")
  } catch (err) {
    res.status(404).send("Not valid register")
  }
}

export const chatOne = async (req: Request, res: Response) => {
  const owner = req.params.owner
  const chatWith = req.params.with
  if (chatWith == "null") {
    const chats = await userServices.listChats(owner)
    res.status(200).send(chats)
  } else {
    const sorted = [owner, chatWith].sort()
    const nameRoom = `${sorted[0]} ${sorted[1]}`
    const chat = await userServices.findchat(nameRoom)

    if (chat?.pair_writers == undefined) {
      res.status(404).send({ msg: "No existe aun un chat" })
    } else {
      res.status(200).send(chat)
    }
  }
}

export const searchOne = async (req: Request, res: Response) => {
  const query = req.params.query
  const result = await userServices.search(query)
  res.status(200).send(result)
}

export const createChatOne = async (
  req: Request,
  res: Response
): Promise<void> => {
  const owner = req.params.owner
  const chatWith = req.params.with
  const sorted = [owner, chatWith].sort()
  const nameRoom = `${sorted[0]} ${sorted[1]}`
  await userServices.createChat(nameRoom) //FIXME: WHAT If try to add someone already added?
}

export const addRoomOne = async (req: Request, res: Response) => {
  const room = req.params.room
  try {
    await userServices.addRoom(room)
    res.status(200).send("nice added room")
  } catch (err) {
    console.log(err)
    res.status(400).send("Fail somethg")
  }
}

export const cloudOne = async (req: Request, res: Response) => {
  // const cloud = req.params.cloud //endopoint dinamic
  try {
    const code = req.query.code as string //query from cloud oauth
    console.log(code)

    const { token_type, access_token } =
      await userServices.getGoogleOauthTokens({
        code,
      })
    console.log("pair:", { token_type, access_token })

    const googleUser = await userServices.getGoogleUser({
      token_type,
      access_token,
    })
  } catch (err: unknown) {
    console.error(err, "Failed to authorize Google User")
    res.redirect(`${config.get("originWeb")}/oauth/error`)
  }
  // res.status(200).send(cloud)
}

export const authGoogle = async (req: Request, res: Response) => {
  const code = req.body.code
  console.log("bodyyy", code)
}
