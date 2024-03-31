import { useContext, useDebugValue, useEffect, useState } from "react"
import { NavLink, redirect, useActionData, useNavigate } from "react-router-dom"
import { Footer } from "../components/footer"
import Cookies from "js-cookie"
import { UserContext } from "./layouts/UserContext"
// import { CookiesProvider, useCookies } from "react-cookie"

export const action = async ({ request }: { request: Request }) => {
  // const [cookie, setCookie] = useCookies(["userData"])
  const dataForm = await request.formData()
  const data = Object.fromEntries(dataForm)
  const payload = { datos: data }
  console.log(payload)
  const response = await fetch("/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", //read cookies then
  })
  // const tokenClient = await response.text();
  // console.log(response.status, tokenClient);
  if (response.status !== 200) {
    // const tokenError = await response.text()
    return redirect("/")
    // return tokenError
  } else {
    //including credentials, we can handle cookie data as well
    const parseCookie = await response.json()

    // getting cookie data as coomonJS mode
    // const cookies = document.cookie.toString().split(";")
    // const partCookie = cookies[0].split("=")[1]
    // const decodedCookie = decodeURIComponent(partCookie)
    // const parseCookie = JSON.parse(decodedCookie)
    console.log("awe", parseCookie)
    localStorage.setItem("token", parseCookie.token)
    localStorage.setItem("user", parseCookie.user.nickname)
    // const { nickname, ...data } = parseCookie

    //We just sent with key Set in res.cookie()
    // Cookies.set(`${nickname}`, JSON.stringify(parseCookie))
    const dataCookie = JSON.parse(Cookies.get("dataUser")) //json
    // const dataCookie = JSON.parse(Cookies.get(`${data.email}`))

    return dataCookie
    // return redirect(`/home`)
    // return redirect(`/home/${nickname}`)
  }
}

export const Landing = () => {
  const dataAction = useActionData()
  const navigate = useNavigate()
  const [room, setRoom] = useState("")
  const { login } = useContext(UserContext)

  useEffect(() => {
    if (dataAction != undefined) {
      login(dataAction)
      navigate("/home")
    }
  }, [dataAction])
  // const [currentUser, setCurrentUSer] = useContext(CurrentUserContext)

  return (
    <>
      <div className="bodyLanding">
        <h3>Bienvenido a las mejores salas de Chat Gratis</h3>
        <div className="boxLanding">
          <div className="salaLanding">
            <NavLink to="/sala/tecnologia">
              <h4>Sala Tecnologia</h4>
            </NavLink>
            <div className="textoLanding">
              <img
                src="public/IA_inteligencia_artificial-510x510.jpg"
                alt="foto"
                width={70}
              />
              <div>
                Bienvenidos al canal para charlas de cosas tecnologicas, todos
                son bienvenidos
              </div>
            </div>
          </div>
          <div className="salaLanding">
            <NavLink to="/sala/cultural">
              <h4>Sala Cultural</h4>
            </NavLink>
            <div className="textoLanding">
              <img src="public/imagen_1_1508257076.jpg" alt="foto" width={70} />
              <div>
                Bienvenidos al canal para mantener charlas intelectuales, todos
                son bienvenidos
              </div>
            </div>
          </div>
          <div className="salaLanding">
            <NavLink to="/sala/deportes">
              <h4>Sala Deportes</h4>
            </NavLink>
            <div className="textoLanding">
              <img src="public/03-deportes_3.png.jpg" alt="foto" width={70} />
              <div>
                Bienvenidos al canal para discutir de todo contra todos, todos
                son bienvenidos
              </div>
            </div>
          </div>
          <div className="salaLanding">
            <NavLink to="/sala/adultos">
              <h4>Sala +18</h4>
            </NavLink>
            <div className="textoLanding">
              <img
                src="public/f.elconfidencial.com_original_b42_e1c_33f_b42e1c33f447e1327f4d7176a42197b4.jpg"
                alt="foto"
                width={70}
              />
              <div>
                Bienvenidos al canal para mantener conversaciones picantes, solo
                los registrado pueden acceder
              </div>
            </div>
          </div>
        </div>
        <br />
        Quieres crear tu propia sala con una temática especial, muy fácil,
        rellena el cuadro siguiente y ya puedes empezar a chatear
        <form>
          <input
            type="text"
            id="inputCreate"
            name="create_rom"
            placeholder="Nombre de la sala"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit" onClick={() => navigate(`sala/${room}`)}>
            Crear sala
          </button>
        </form>
        Quieres entrar en una sala ya creada?
        <form>
          <input
            type="text"
            id="inputJoin"
            name="join_rom"
            placeholder="Nombre de la sala"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit" onClick={() => navigate(`sala/${room}`)}>
            Unirte sala
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
