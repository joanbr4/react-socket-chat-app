import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useContext } from "react"
// import { useNavigate } from "react-router-dom"
import { UserContext } from "../pages/layouts/UserContext"
import { useNavigate } from "react-router-dom"
import { getToken } from "../hooks/controllers"

// interface IGoogCode {
//   clientId: string
//   credential: string
//   select_by: string
// }
type TDecodedToken = {
  email: string
  given_name: string
  name: string
  iss: string
}

function GoogleButton() {
  const navigate = useNavigate()
  const { userRef } = useContext(UserContext) || {}

  const succes = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse)
    try {
      const decode: TDecodedToken = jwtDecode(
        String(credentialResponse?.credential)
      )
      console.log(decode)
      const { iss, email, given_name: nickname, name: fullname } = decode
      if (userRef) {
        //Actulizamos el user global
        userRef.current = {
          _id: iss,
          email,
          genere: "Not Selected",
          nickname,
          name: fullname,
        }
      }
      const token = await getToken(decode)
      console.log(token)
      //We dont have nickname in google data, get email instead
      localStorage.setItem("user", email)
      navigate("/home")

      console.log(userRef?.current)
    } catch (err) {
      console.log(err)
    }
  }

  const error = () => {
    console.log("Error al hacer login")
  }

  return (
    <div className="google-login-button">
      <GoogleLogin onSuccess={succes} onError={error} />
    </div>
  )
}

export default GoogleButton
