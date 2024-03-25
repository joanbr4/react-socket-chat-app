import { ReactNode, createContext, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { Props } from "react-select/base"
const UserContext = createContext(null)
import Cookies from "js-cookie"

const UserProvider = ({ children }) => {
  // const UserProvider = ({ children }: { children: ReactNode }) => {
  const userRef = useRef(null)
  // const [user, setUser] = useState(null)
  console.log("dataREf", userRef)
  const dataCookie = Cookies.get("dataUser")
  if (dataCookie) {
    const jsonCookie = JSON.parse(dataCookie)
    userRef.current = jsonCookie
  }
  console.log("dataContext", dataCookie)

  const login = (userData: any) => {
    userRef.current = userData
    // setUser(userData)
  }

  return (
    <UserContext.Provider
      value={{
        userRef,
        // setUser,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
