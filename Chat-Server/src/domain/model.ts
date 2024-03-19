import { JwtPayload } from "jsonwebtoken"

interface IdataLogin {
  email: string
  passw: string
}

interface IcustomRequest extends Request {
  token: string | JwtPayload
}

interface IcontrollerExpress {}

interface IdataRegister {
  name: string
  surname: string
  nickname: string
  genere: string
  email: string
  password: string
  date: Date
}
interface IdbMessage {
  room: string
  messages: object[]
}
export {
  IdataLogin,
  IcontrollerExpress,
  IdataRegister,
  IdbMessage,
  IcustomRequest,
}
