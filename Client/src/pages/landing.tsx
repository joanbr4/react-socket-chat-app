import { useContext, useEffect, useState } from "react"
import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom"
import { Footer } from "../components/footer"
import Cookies from "js-cookie"
import { IuserStructure, UserContext } from "./layouts/UserContext"

export const action = async ({ request }: { request: Request }) => {
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

  if (response.status !== 200) {
    return redirect("/")
  } else {
    //including credentials, we can handle cookie data as well
    const parseCookie = await response.json()

    localStorage.setItem("token", parseCookie.token)
    localStorage.setItem("user", parseCookie.user.nickname)

    const dataCookie = JSON.parse(Cookies.get("dataUser") as string) //json

    return dataCookie
  }
}

export const Landing = () => {
  const dataAction = useActionData() as IuserStructure
  const navigate = useNavigate()
  const [room, setRoom] = useState("")

  const userContext = useContext(UserContext)
  const login = userContext ? userContext.login : undefined
  useEffect(() => {
    if (dataAction != undefined && login != undefined) {
      login(dataAction)
      navigate("/home")
    }
  }, [dataAction])

  const createRoom = async (name: string) => {
    console.log("name: ", name)
    // await createSala(name)
    navigate(`sala/${name}`)
  }
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
                width={90}
                height={90}
              />
              <p>
                Bienvenidos al canal para charlas de cosas tecnologicas, todos
                son bienvenidos
              </p>
            </div>
          </div>
          <div className="salaLanding">
            <NavLink to="/sala/cultural">
              <h4>Sala Cultural</h4>
            </NavLink>
            <div className="textoLanding">
              <img
                src="public/imagen_1_1508257076.jpg"
                alt="foto"
                width={90}
                height={90}
              />
              <p>
                Bienvenidos al canal para mantener charlas intelectuales, todos
                son bienvenidos
              </p>
            </div>
          </div>
          <div className="salaLanding">
            <NavLink to="/sala/deportes">
              <h4>Sala Deportes</h4>
            </NavLink>
            <div className="textoLanding">
              <img
                src="public/03-deportes_3.png.jpg"
                alt="foto"
                width={90}
                height={90}
              />
              <p>
                Bienvenidos al canal para discutir de todo contra todos, todos
                son bienvenidos
              </p>
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
                width={90}
                height={90}
              />
              <p>
                Bienvenidos al canal para mantener conversaciones picantes, solo
                los registrado pueden acceder
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="inputBoxLanding">
          <h3>
            Quieres crear tu propia sala con una temática especial, muy fácil,
            rellena el cuadro siguiente y ya puedes empezar a chatear
          </h3>
          <Form className="inputSalaLanding">
            <input
              type="text"
              id="inputCreate"
              name="create_rom"
              placeholder="Nombre de la sala"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button type="submit" onClick={() => createRoom(room)}>
              Crear sala
            </button>
          </Form>
          Quieres entrar en una sala ya creada?
          <form className="inputSalaLanding">
            <input
              type="text"
              id="inputJoin"
              name="join_rom"
              placeholder="Nombre de la sala"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button type="submit" onClick={() => createRoom(room)}>
              {/* <button type="submit" onClick={() => navigate(`sala/${room}`)}> */}
              Unirte sala
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
