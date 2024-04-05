import { ReactNode, createContext, useRef } from "react"
import Cookies from "js-cookie"

export interface IuserContextData {
  userRef: React.MutableRefObject<IuserStructure | null>
  login(data: IuserStructure): void
}
export interface IuserStructure {
  email: string
  genere: string
  name: string
  nickname: string
  _id: string
}

const UserContext = createContext<IuserContextData | null>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const userRef = useRef<IuserStructure | null>(null) //for assert mutable values of useRef

  const dataCookie = Cookies.get("dataUser")
  if (dataCookie) {
    const jsonCookie = JSON.parse(dataCookie)
    userRef.current = jsonCookie
  }

  const login = (userData: IuserStructure) => {
    userRef.current = userData
  }

  return (
    <UserContext.Provider
      value={{
        userRef,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
