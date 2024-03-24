import { useEffect, useRef } from "react"
import { useLoaderData, Form } from "react-router-dom"
import { io } from "socket.io-client"
import { Message } from "./message"

export const loader = async ({ params }) => {
  const dataContact = params.id
  const response = await fetch(`/user/${dataContact}`)
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

  const socket = io("http://localhost:4000", {
    transports: ["websocket"], // Required when using Vite
  })
  // socket.emit("room", room)

  useEffect(() => {
    // socket.on("connect", () => {
    // })
    // if (actionData != undefined) {

    socket.on(`room-`, (msg: IsocketReceved) => {
      const updateMessages = [...messages]
      updateMessages.push(msg)
      console.log("state", updateMessages)
      setMessages(updateMessages)
    })
    // }
  }, [socket, messages])
  // }, [socket])

  // const createNickname = () => {
  //   setFinalNickname(nickname)
  // }

  // const closeRoom = (room: string) => {
  //   socket.emit("disconect", room)
  // }

  const sendMessage = (room: string, apodo: string) => {
    // console.log("asdf", room)
    // const message = inputRef.current.value //Ya lo cogemos del useState

    if (socket) socket.emit("chat", { message, room, apodo })
    inputRef.current.value = "" //FIXME: how to fix this alert bc of typescript nature
  }

  // }, [socketing, actionData]);
  return (
    <div className="bodyHome">
      <aside>
        <Form>
          <input type="text" />
          <button type="submit">Buscar</button>
        </Form>
        <h3>Conversaciones Abiertas</h3>
        {}
      </aside>

      <div className="salaRoom">
        <div className="titleRoom">
          {/* <h3>Room: {room}</h3> */}
          <h4>Live Chat</h4>
        </div>
        <div className="bodyRoom">
          <div className="chatRoom">
            <div className="messageBoxRoom">
              {messages.map(
                (linea, index) => (
                  // {
                  // return (
                  <Message
                    key={index}
                    message={linea.msg}
                    userLine={linea.user}
                    index={index}
                  />
                )
                // )
              )}
            </div>

            <Form>
              <div className="boxInputRoom">
                {messages.length != 0 ? <ul id="message"></ul> : null}
                <div className="userInputRoom">{nickname}</div>
                <input
                  placeholder="Enviar un mensaje..."
                  className="textInputRoom"
                  ref={inputRef}
                  id="inputSend"
                  // name="input"
                  // autoComplete="off"
                  contentEditable="true"
                  role="textbox"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="buttonInputRoom"
                  type="submit"
                  onClick={() => sendMessage(room, finalnickname)}
                >
                  Send
                </button>
                {/* </div> */}
              </div>
            </Form>
          </div>
        </div>

        {/* <Form method="POST">
        <input
          ref={roomRef}
          type="text"
          id="inputCreate"
          name="name_rom"
          placeholder="Nombre de la sala"
        />
        <button type="submit" onClick={() => createroom()}>
          Crear sala
        </button>
      </Form> */}
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
