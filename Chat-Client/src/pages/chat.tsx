import { useContext, useEffect, useRef, useState } from "react"
import {
  Form,
  Params,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { UserContext } from "./layouts/UserContext"
import { socket } from "../backend/socket"
import { Message } from "../components/message"
import Cookies from "js-cookie"
import { getChat } from "../hooks/controllers"

export const loader = async ({ params }: { params: Params }) => {
  const userWith = params.user
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  console.log("23423", user, userWith)
  // console.log("23423", token)
  try {
    const response = await getChat(user, userWith, token)

    console.log("wer", response.status)
    if (response.status !== 200) {
      return { msg: "Still no chat" }
    } else {
      const chat = await response.json()
      console.log("chat", chat)
      return chat
    }
  } catch (err) {
    console.log("errrr", err)
  }
}
interface Idb {
  _id: string
  pair_writers: string
  messages: Array<{ write: string; message: string }>
}
const Chat = () => {
  const dataLoader = useLoaderData() as Idb
  console.log("Chat", dataLoader)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const { userRef } = useContext(UserContext)
  const { user } = useParams()
  const writer = userRef.current.nickname
  const sortedRoom = [writer, user].sort()
  const nameRoom = `${sortedRoom[0]} ${sortedRoom[1]}`
  console.log(nameRoom)
  useEffect(() => {
    // if (dataLoader == Idb) {
    if (dataLoader?.pair_writers != undefined) {
      const listMessages = [...dataLoader.messages]
      console.log(listMessages)
      setMessages(listMessages)
    }
  }, [dataLoader])

  useEffect(() => {
    socket.emit("private-chat", nameRoom)
    socket.on(`${nameRoom}`, (chat) => {
      console.log("asdae", chat)
      const newMessages = [...messages]
      newMessages.push(chat)
      setMessages(newMessages)
    })
  }, [socket, messages])

  const sendMessage = (room: string) => {
    // console.log("asdf", room)
    // const message = inputRef.current.value //Ya lo cogemos del useState
    if (socket) socket.emit("chatting", { message, room, writer })
    inputRef.current.value = "" //FIXME: how to fix this alert bc of typescript nature
  }

  return (
    <div className="chatRoom">
      <div className="messageBoxRoom">
        {messages.length > 0 ? (
          messages.map((msg: IsocketReceved, index) => (
            <Message
              key={index}
              message={msg.message}
              apodo={msg.writer}
              index={index}
            />
          ))
        ) : (
          <p>Ya puede empezar la conversacion</p>
        )}
      </div>

      <Form>
        <div className="boxInputRoom">
          <div className="boxUsernameRoom">
            <div className="userInputRoom">{userRef.current.nickname}</div>
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
          </div>
          <button
            className="buttonInputRoom"
            type="submit"
            onClick={() => sendMessage(nameRoom as string)}
          >
            Send
          </button>
          {/* </div> */}
        </div>
      </Form>
    </div>
  )
}

export { Chat }
