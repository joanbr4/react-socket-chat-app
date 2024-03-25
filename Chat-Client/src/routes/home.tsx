import { useContext, useEffect, useRef } from "react"
import { useLoaderData, Form, Outlet } from "react-router-dom"
import { socket } from "./socket"
import { Message } from "./message"
import { UserContext } from "./UserContext"

export const loader = async ({ params }) => {
  // const dataContact = params.id

  // const data = userRef
  // const response = await fetch(`/user/${dataContact}`)
  return "hola"
}

export const Home = () => {
  const openChats = useLoaderData()
  const finalnickname = ""
  const createNickname = ""
  const message = []
  const messages = []
  const nickname = ""
  const inputRef = useRef(null)
  // const { id: room } = useParams()
  // const navigation = useNavigate()
  // const inputRef = useRef(null)
  // const roomRef = useRef(null)
  // const [message, setMessage] = useState("")
  // const [messages, setMessages] = useState([])
  // const [nickname, setNickname] = useState("")
  // const [finalnickname, setFinalNickname] = useState("")
  const { userRef } = useContext(UserContext)
  // socket.emit("room", room)

  useEffect(() => {
    // socket.on("connect", () => {
    // })
    // if (actionData != undefined) {
    // socket.on(`room-`, (msg: IsocketReceved) => {
    //   const updateMessages = [...messages]
    //   updateMessages.push(msg)
    //   console.log("state", updateMessages)
    //   setMessages(updateMessages)
    // })
    // }
  })
  // }, [socket])

  // const closeRoom = (room: string) => {
  //   socket.emit("disconect", room)
  // }
  const queryUSer = () => {}

  // }, [socketing, actionData]);
  return (
    <div className="bodyHome">
      <aside>
        <div className="boxbusquedaHome">
          <Form>
            <input
              className="busquedaHome"
              type="text"
              // style={{ height: "100%", width: "100%" }}
              onChange={queryUSer}
            />
          </Form>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#6765e0"
            className="svgHome"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <br />
        </div>
        <h3>Chats</h3>
        <ul>{}</ul>
      </aside>

      <div className="chatHome">
        <div className="titleRoom">
          {/* <h3>Room: {room}</h3> */}
          <h4>Live Chat</h4>
        </div>
        <div className="bodyRoom"></div>
        <Outlet />

        <br />
        {/* <button
        onClick={() => {
          navigation(-1)
          closeRoom(room)
        }}
      >
        Volver
      </button> */}
      </div>

      {/* <div className="central">
        <h4>hola</h4>
        <div className="BoxChat">
          <input />
          <button type="submit">Enviar</button>
        </div>
      </div> */}
    </div>
  )
}
