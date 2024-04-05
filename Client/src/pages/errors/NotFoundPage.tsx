import { NavLink } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <h1>You'r out of this project!!</h1>
      <p>Here are some helpful links:</p>
      <button>
        <NavLink to="/">Landing</NavLink>
      </button>
      <button>
        <NavLink to="/home">Home</NavLink>
      </button>
      <button>
        <NavLink to="/signIn">Register</NavLink>
      </button>
    </div>
  )
}
