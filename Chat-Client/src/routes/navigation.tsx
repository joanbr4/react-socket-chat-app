import { useContext } from "react"
import { useNavigate, NavLink, Form, useActionData } from "react-router-dom"
import { UserContext } from "./UserContext"
import Cookies from "js-cookie"
import { Socket } from "socket.io-client"

export const Navigation = () => {
  // const dataAction = useActionData()
  // console.log(dataAction)
  const { userRef } = useContext(UserContext)
  const navigate = useNavigate()
  console.log("dataNAv:", userRef)

  const logout = () => {
    Cookies.remove("dataUser")
    userRef.current = null
    navigate("/")
  }

  return (
    <nav className="Nav">
      {userRef.current == null ? (
        // {typeof userRef.current != "object" ? (
        <div className="barNav">
          <h3>Chat en vivo!</h3>
          <div className="formNav">
            <Form method="post">
              {/* <form method="post" action="/api/login"> */}
              <input
                type="email"
                className="inputNav"
                name="email"
                placeholder="Write your email"
              />
              <input
                type="password"
                className="inputNav"
                name="passw"
                placeholder="Password"
              />
              <button type="submit" className="butNav">
                Log in
              </button>
            </Form>
            <button className="butNav">
              <NavLink className="butNav" to="/signIn">
                Sign In
              </NavLink>
            </button>
            <div className="errorMsg"></div>
          </div>
        </div>
      ) : (
        <div className="barNav">
          <NavLink to="/home">
            <h3>{userRef.current.nickname}</h3>
          </NavLink>
          <button onClick={logout}>logout</button>
        </div>
      )}
    </nav>
  )
}
