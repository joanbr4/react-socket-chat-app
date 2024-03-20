import { IdataLogin, IdataRegister } from "../../domain/model"
import { Document, Model } from "mongoose"
import { UserModel } from "../database/mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (
  data: IdataRegister
  // data: Document<IdataRegister>
): Promise<void | object> => {
  try {
    const { name, surname, nickname, genere, email, password } = data
    await UserModel.create({
      name: name,
      username: surname,
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
      const token = jwt.sign({ foundUser }, "sercrekey", { expiresIn: "1h" })

      return { foundUser, token }
    } else {
      return { mssg: "Error en el password" }
    }
  } catch (err) {
    return { mssg: "Error en los datos de login", err }
  }
}
