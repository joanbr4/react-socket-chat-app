import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, UserProvider } from "../pages/layouts/UserContext"
import axios from "axios"

interface IGoogletoken {
  authuser: string
  code: string
  prompt: string
  scope: string
}
// type TDecodedToken = {
//   email: string
//   given_name: string
//   name: string
//   sub: string
// }

function GoogleButton() {
  const navigate = useNavigate()
  const { userRef } = useContext(UserContext) || {}

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response)
      try {
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response?.access_token}`,
            },
          }
        )
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    flow: "auth-code",
    onError: () => {
      console.log("Error al hacer login")
    },
  })

  return (
    <div className="google-login-button">
      <button onClick={() => login()}>Google In</button>
    </div>
  )
}

export default GoogleButton
