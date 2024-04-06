import { NavLink } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage" id="error-page">
      <h1>You'r out of this project!!</h1>
      <p>Here are some helpful links:</p>
      <div className="boxButtonsNFP">
        <button className="buttonNFP">
          <NavLink to="/">Landing</NavLink>
        </button>
        <button className="buttonNFP">
          <NavLink to="/home">Home</NavLink>
        </button>
        <button className="buttonNFP">
          <NavLink to="/signIn">Register</NavLink>
        </button>
      </div>
    </div>
  )
}
