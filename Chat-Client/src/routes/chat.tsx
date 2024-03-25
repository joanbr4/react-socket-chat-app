import { useContext, useEffect, useRef, useState } from "react"
import { Form, Params, useLoaderData, useParams } from "react-router-dom"
import { UserContext } from "./UserContext"
import { socket } from "./socket"
import { Message } from "./message"
import Cookies from "js-cookie"

export const loader = async ({ params }: { params: Params }) => {
  const userWith = params.user
  const token = localStorage.getItem("authToken")
  const user = localStorage.getItem("user")
  console.log("23423", user, userWith)
  // console.log("23423", token)
  try {
    const response = await fetch(`/chat/${user}/${userWith}`, {
      headers: {
        // Authorization: "Bearer ",
        Authorization: "Bearer " + token,
        // "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    })
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

const Chat = () => {
  const dataLoader = useLoaderData()
  const inputRef = useRef(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const { userRef } = useContext(UserContext)
  const { user } = useParams()
  const writer = userRef.current.nickname
  const sortedRoom = [writer, user].sort()
  const nameRoom = `${sortedRoom[0]} ${sortedRoom[1]}`
  console.log(nameRoom)
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
      <div className="messageBoxR oom">
        {messages.length > 0 ? (
          messages.map((msg: IsocketReceved, index) => (
            <Message
              key={index}
              message={msg.text}
              apodo={msg.user}
              index={index}
            />
          ))
        ) : (
          <p>{userRef.current.nickname} se ha conectado...</p>
        )}
      </div>

      <Form>
        <div className="boxInputRoom">
          {messages.length != 0 ? <ul id="message"></ul> : null}
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
