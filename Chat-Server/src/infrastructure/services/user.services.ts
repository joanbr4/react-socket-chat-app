import { IdataLogin, IdataRegister } from "../../domain/model"
import { Document, Model } from "mongoose"
import { UserModel } from "../database/mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (
  data: IdataRegister
  // data: Document<IdataRegister>
): Promise<void> => {
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
  } catch (err) {
    throw Error
  }
}

export const login = async (data: IdataLogin) => {
  try {
    const foundUser = await UserModel.findOne({
      $and: [{ email: data.email }, { passw: data.passw }],
    })
    if (!foundUser) throw new Error("No login match")
    const isMatch = bcrypt.compareSync(data.passw, foundUser.password)
    if (isMatch) {
      const token = jwt.sign(foundUser, "sercrekey", { expiresIn: "1h" })

      return { foundUser, token }
    } else {
      throw new Error("No crypto is correct")
    }
  } catch (err) {
    console.log(err)
  }
}
