// import "dotenv/config"
import { useContext } from "react"
import { useNavigate, NavLink, Form } from "react-router-dom"
import { UserContext } from "../pages/layouts/UserContext"
import Cookies from "js-cookie"
import GoogleButton from "./GoogleButton"
import { googleLogout } from "@react-oauth/google"
export const Navigation = () => {
  const { userRef } = useContext(UserContext) || {}
  const navigate = useNavigate()

  const logout = () => {
    googleLogout()
    Cookies.remove("dataUser") //works!!
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    if (userRef) {
      userRef.current = null
    }
    navigate("/")
  }

  return (
    <nav className="Nav">
      {userRef?.current == null ? (
        // {typeof userRef.current != "object" ? (
        <div className="barNav">
          <h3>Just Chattin'!</h3>
          <div className="formNav">
            <Form method="post">
              {/* <form method="post" action="/api/login"> */}
              <input
                type="email"
                className="inputNav"
                name="email"
                placeholder="Email"
                style={{ paddingLeft: 5 }}
              />
              <input
                type="password"
                className="inputNav"
                name="passw"
                placeholder="Password"
                style={{ paddingLeft: 5 }}
              />
              <div className="boxButtonNav">
                <button type="submit" className="butNav">
                  Log in
                </button>
                <GoogleButton />
                <button className="butNav">
                  <NavLink className="butNav" to="/signIn">
                    Sign In
                  </NavLink>
                </button>
              </div>
            </Form>
            <div className="errorMsg"></div>
          </div>
        </div>
      ) : (
        <div className="barNav">
          <NavLink to="/home">
            {/* <img /> */}
            <h3>{userRef?.current.name}</h3>
          </NavLink>
          <button onClick={logout}>logout</button>
        </div>
      )}
    </nav>
  )
}
