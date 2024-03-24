import { useContext } from "react"
import { NavLink, Form, useActionData } from "react-router-dom"

export const Navigation = () => {
  const dataAction = useActionData()
  const [currentUser, setCurrentUSer] = useContext(CurrentUserContext)
  // console.log(data)
  return (
    <nav className="Nav">
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
    </nav>
  )
}
