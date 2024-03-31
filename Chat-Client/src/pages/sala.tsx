import { useEffect, useRef, useState } from "react"
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useParams,
} from "react-router-dom"
import { socket } from "../backend/socket"
import { Message } from "../components/message"

interface Ichat {
  data: FormDataEntryValue
}

interface IsocketReceved {
  message: string
  // text: { msg: string; user: string }[]
  apodo: string
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
  const navigate = useNavigate()
  const inputRef = useRef(null)
  // const socket = useRef(null)
  // const roomRef = useRef(null)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [nickname, setNickname] = useState("")
  const [finalnickname, setFinalNickname] = useState("")
  console.log("msg", message)
  console.log("msgs", messages.length)
  console.log("F", finalnickname)
  //Count user even no sending any mssg

  socket.on("count Users", (totalUsers) => {
    console.log("totalUsers", totalUsers)
    setCount(totalUsers)
  })

  useEffect(() => {
    if (finalnickname != "") {
      socket.emit("count Users", { room, finalnickname, status: true })
    }
    socket.on(`public-${room}`, (msg: IsocketReceved) => {
      // socket.on(`room-${room}`, (msg: IsocketReceved) => {
      const updateMessages = [...messages]
      updateMessages.push(msg)
      console.log("state", updateMessages)
      setMessages(updateMessages)
    })

    // }
    // }, [])
  }, [socket, messages, room, finalnickname])
  // }, [socket])

  const createNickname = () => {
    socket.emit("count Users", { room, finalnickname, status: true })
    setFinalNickname(nickname)
  }

  const closeRoom = (room: string) => {
    socket.emit("count Users", { room, finalnickname, status: false })
    socket.close()
    navigate("/")
  }

  const sendMessage = (room: string, apodo: string) => {
    if (socket) socket.emit("public-chat", { message, room, apodo })

    inputRef.current.value = "" //FIXME: how to fix this alert bc of typescript nature
  }

  // }, [socketing, actionData]);
  return (
    <div className="bodySala">
      <div className="titleRoom">
        <button
          onClick={() => {
            closeRoom(room as string)
            // navigate("/")
          }}
        >
          Volver
        </button>

        <h3>Room: {room}</h3>
        <h4>Live Chat</h4>
        <button>{count} Connected</button>
      </div>
      <div className="boxSala">
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
            <div className="messageBoxR oom">
              {messages.length > 0 ? (
                messages.map((msg: IsocketReceved, index) => (
                  <Message
                    key={index}
                    message={msg.message}
                    apodo={msg.apodo}
                    index={index}
                  />
                ))
              ) : (
                <p>{nickname} se ha conectado...</p>
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
                  onClick={() => sendMessage(room as string, finalnickname)}
                >
                  Send
                </button>
                {/* </div> */}
              </div>
            </Form>
          </div>
        )}
      </div>

      {/* <br /> */}
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
