import { useEffect, useRef, useState } from "react"
import { Form, useActionData, useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { Message } from "./message"

interface Ichat {
  data: FormDataEntryValue
}

interface IsocketReceved {
  text: { msg: string; user: string }[]
  user: string
}
export const action = async ({
  request,
}: {
  request: Request
}): Promise<Ichat> => {
  // const result = await fetch("/socket.io/socket.io.js")
  const formData = await request.formData()
  const dataObject = Object.fromEntries(formData)
  return { data: dataObject.input }
  // if (formData) {
  //   socket.emit("chat message", dataObject.input, (response: string) => {
  //     console.log(response)
  //     return response
  //   })
  // }
  // console.log(dataObject)
}

export function Sala() {
  const { id: room } = useParams()
  // const navigation = useNavigate()
  const inputRef = useRef(null)
  const roomRef = useRef(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [nickname, setNickname] = useState("")
  const [finalnickname, setFinalNickname] = useState("")
  console.log("N", messages)
  console.log("F", finalnickname)
  const socket = io("http://localhost:4000", {
    transports: ["websocket"], // Required when using Vite
  })
  socket.emit("room", room)
  // const actionData = useActionData()
  // console.log("asd", actionData)

  useEffect(() => {
    // socket.on("connect", () => {
    // })
    // if (actionData != undefined) {
    socket.on(`room-${room}`, (msg: IsocketReceved) => {
      const user = msg.user
      const newChat = msg.text
      console.log("werr", msg, user)
      // const newChat = [...chat]

      setMessages(newChat)
    })
    // }
  }, [])

  const createNickname = () => {
    setFinalNickname(nickname)
  }

  const closeRoom = (room) => {
    socket.emit("disconect", room)
  }

  const sendMessage = (room, apodo) => {
    // console.log("asdf", room)
    // const message = inputRef.current.value //Ya lo cogemos del useState
    console.log("sad", apodo)
    // if (finalnickname != "") {
    if (socket) socket.emit("chat", { message, room, apodo })
    inputRef.current.value = ""
    // } else {
    //   alert("Debes ingresar un nickname")
    // }
  }

  // }, [socketing, actionData]);
  return (
    <div className="salaRoom">
      <div className="titleRoom">
        <h3>Room: {room}</h3>
        <h4>Live Chat</h4>
      </div>
      <div className="bodyRoom">
        {finalnickname == "" ? (
          <div className="apodoBoxRoom">
            <Form>
              <input
                type="text"
                placeholder="Escriba su apodo"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button type="submit" onClick={createNickname}>
                Chatear
              </button>
            </Form>
          </div>
        ) : (
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
        )}
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
  )
}
