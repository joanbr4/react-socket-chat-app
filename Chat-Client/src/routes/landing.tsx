import { useState } from "react"
import { NavLink, redirect, useNavigate } from "react-router-dom"
import { Footer } from "./footer"
// import Cookies from "js-cookie";
import { CookiesProvider, useCookies } from "react-cookie"

export const action = async ({ request }) => {
  const [cookie, setCookie] = useCookies(["userData"])
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
  })
  // const tokenClient = await response.text();
  // console.log(response.status, tokenClient);
  if (response.status !== 200) {
    const tokenError = await response.text()
    return tokenError
  } else {
    const tokenJSON = await response.json()
    // console.log("asdf", tokenJSON.queryUser.foundUser);
    const { token, foundUser } = tokenJSON.queryUser
    console.log("asdf", foundUser, "tok:", token)
    setCookie("userData", foundUser)
    // Set-Cookies: .setItem("authToken", tokenClient)
    return redirect("/home")
  }
}

export const Landing = () => {
  const [room, setRoom] = useState("")

  const navigate = useNavigate()

  return (
    <>
      <div className="bodySala">
        <h3>Bienvenido a las mejores salas de Chat Gratis</h3>
        <div className="boxHome">
          <div className="salaHome">
            <NavLink to="/sala/tecnologia">
              <h4>Sala Tecnologia</h4>
            </NavLink>
            <div className="textoHome">
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
          <div className="salaHome">
            <NavLink to="/sala/cultural">
              <h4>Sala Cultural</h4>
            </NavLink>
            <div className="textoHome">
              <img src="public/imagen_1_1508257076.jpg" alt="foto" width={70} />
              <div>
                Bienvenidos al canal para mantener charlas intelectuales, todos
                son bienvenidos
              </div>
            </div>
          </div>
          <div className="salaHome">
            <NavLink to="/sala/deportes">
              <h4>Sala Deportes</h4>
            </NavLink>
            <div className="textoHome">
              <img src="public/03-deportes_3.png.jpg" alt="foto" width={70} />
              <div>
                Bienvenidos al canal para discutir de todo contra todos, todos
                son bienvenidos
              </div>
            </div>
          </div>
          <div className="salaHome">
            <NavLink to="/sala/adultos">
              <h4>Sala +18</h4>
            </NavLink>
            <div className="textoHome">
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
            id="inputJoin"
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
