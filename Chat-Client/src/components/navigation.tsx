// import "dotenv/config"
import { useContext } from "react"
import { useNavigate, NavLink, Form, useActionData } from "react-router-dom"
import { UserContext } from "../pages/layouts/UserContext"
import Cookies from "js-cookie"

export const Navigation = () => {
  // const dataAction = useActionData()
  // console.log(dataAction)
  const { userRef } = useContext(UserContext)
  const navigate = useNavigate()
  console.log("dataNAv:", userRef)

  const logout = () => {
    Cookies.remove("dataUser") //works!!
    localStorage.removeItem("user")
    localStorage.removeItem("token")
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
              <div>
                <button type="submit" className="butNav">
                  Log in
                </button>
                {/* <button>
                  <NavLink to={getGoogleOauthURL()}>Google In</NavLink>
                </button> */}
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
            <h3>{userRef.current.nickname}</h3>
          </NavLink>
          <button onClick={logout}>logout</button>
        </div>
      )}
    </nav>
  )
}
