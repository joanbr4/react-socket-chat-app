import { Outlet } from "react-router-dom"
import { Navigation } from "./navigation"
import Cookies from "js-cookie"
import { useState, createContext, useContext } from "react"
// import { Footer } from "./footer"
import { UserContext, UserProvider } from "./UserContext"

// const CurrentUserContext = createContext(null)
// export const loader = async () => {
//   // console.log(result)
//   // const socket = io()
//   return "hola"
// }

const MainLayout = () => {
  const [user, setUser] = useState(null)

  const dataCookie = Cookies.get("dataUSer")

  console.log("aerer", dataCookie)
  // const dataAction = useActionData()
  return (
    <>
      <UserProvider value={{ user, setCurrentUser: setUser }}>
        <Navigation />
        {/* <Navigation value={{ setCurrentUser }} /> */}
        <Outlet />
        {/* <Footer /> */}
      </UserProvider>
    </>
  )
}

export { MainLayout }
