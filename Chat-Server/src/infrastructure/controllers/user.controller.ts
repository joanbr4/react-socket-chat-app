import { Request, Response } from "express"
import { IdataLogin } from "../../domain/model"
import * as userServices from "../services/user.services"
import jwt from "jsonwebtoken"
const datosDB = [{ nombre: "lara", email: "lara@gmail.com", passw: "asdf" }]

export const loginOne = async (req: Request, res: Response) => {
  const data: IdataLogin = req.body.datos

  if (!data) res.status(404).send("Volver a empezar")

  const queryUser = await userServices.login(data)

  if (queryUser?.foundUser == undefined) res.status(404).send("Not valid login")

  res.cookie("token", queryUser?.token, {
    httpOnly: true,
  })
  res.status(200).send({ queryUser, msg: "Logged in" })
}

export const registerOne = async (req: Request, res: Response) => {
  try {
    const { name, surname, nickname, genere, email, password } = req.body.data
    // console.log("asdf", req.body.data)
    datosDB.push(req.body.data)

    await userServices.register(req.body.data)
    res.status(200).send("Registered")
  } catch (err) {
    res.status(404).send("Not valid register")
  }
}
