import { useEffect, useRef, useState } from "react"
import { Form, useNavigate, useParams } from "react-router-dom"
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
  const formData = await request.formData()
  const dataObject = Object.fromEntries(formData)
  return { data: dataObject.input }
}

export function Sala() {
  const { id: room } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  // const socket = useRef(null)
  // const roomRef = useRef(null)
  const [count, setCount] = useState<number>(0)
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<IsocketReceved[]>([])
  // const [messages, setMessages] = useState<Array<IsocketReceved>>([])//same thing
  const [nickname, setNickname] = useState<string>("")
  const [finalnickname, setFinalNickname] = useState<string>("")
  console.log("msg", message)
  console.log("msgs", messages.length)
  console.log("F", finalnickname)
  //Count user even no sending any mssg

  socket.on("count Users", (totalUsers) => {
    console.log("totalUsers", totalUsers)
    setCount(totalUsers)
  })

  useEffect(() => {
    const setupSocket = async () => {
      socket.connect()
      socket.emit("count Users", { room, finalnickname, status: true })
    }
    setupSocket()

    // socket.close()
  }, [])

  useEffect(() => {
    socket.emit("count Users", { room, finalnickname, status: true })
    socket.on(`public-${room}`, (msg: IsocketReceved) => {
      const updateMessages = [...messages]
      updateMessages.push(msg)
      console.log("state", updateMessages)
      setMessages(updateMessages)
    })

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

    if (inputRef?.current) {
      inputRef.current.value = "" //FIXME: how to fix this alert bc of typescript nature
    }
  }

  // }, [socketing, actionData]);
  return (
    <div className="bodySala">
      <div className="titleRoom">
        <button
          onClick={() => {
            closeRoom(room as string)
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
            <div className="messageBoxRoom">
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
    </div>
  )
}
