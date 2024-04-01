import { useContext, useEffect, useRef, useState } from "react"
import {
  useLoaderData,
  // useSubmit,
  Form,
  Outlet,
  NavLink,
  useParams,
  Navigate,
  useNavigate,
  // useSearchParams,
} from "react-router-dom"

import { UserContext } from "./layouts/UserContext"
import { getChatsWith, getSearch } from "../hooks/controllers"
import { useSearchQuery } from "../hooks/useSearchQuery"
import { useDebounce } from "../hooks/useDebounce"
// import { Chat } from "./chat"

export const loader = async () => {
  // const dataContact = params.id
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  const response = await getChatsWith(String(user), String(token))
  const jsonResp = await response.json()
  // console.log("json", jsonResp)

  return jsonResp
}

function useSearch(search: string) {
  const [searching, setSearching] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const debounceSearch = useDebounce<string>(search, 500)
  useEffect(() => {
    setSearching(search !== "")
    setLoading(search !== "")
  }, [search])
  useEffect(() => {
    setLoading(false)
  }, [debounceSearch])
  return { loading, searching }
}

export const Home = () => {
  const openChats = useLoaderData() as string[]
  const [list, setList] = useState<string[]>([])
  const [text, setText] = useState<boolean>(false)
  const [search, setSearch] = useState<object[]>([])
  const navigate = useNavigate()
  // console.log("fromLoader", typeof openChats, openChats)
  // const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null)
  const searchParams = useSearchQuery()
  // const [search] = searchParams

  useEffect(() => {
    if (openChats.length > 0) {
      setList(openChats)
    }
  }, [list])

  // const searchUser = async (e: { target: HTMLInputElement }) => {
  //   const data = e.target.value
  //   const response = await getSearch(data)
  //   console.log(data)
  // }
  const startDebunce = async (data: string) => {
    console.log("search:", data)
    const response = await getSearch(data)
    console.log("fromServer", response)
    setSearch(response)
    navigate("/home/browse")
    // navigate("/browse/?q=" + data)
    // const s = useSearch(search)
  }
  const clearInput = () => {
    setText(false)
    setSearch([])
    inputRef.current!.value = "" // ! non-full assertion operator, declares never is null its value
  }
  return (
    <div className="bodyHome">
      <aside id="sidebar">
        <div className="boxbusquedaHome">
          <Form>
            <input
              className="busquedaHome"
              type="text"
              // type="search"
              name="q"
              ref={inputRef}
              placeholder="Search a user..."
              // style={{ height: "100%", width: "100%" }}
              onChange={(e) => {
                setText(true)
                startDebunce(e.target.value)
              }}
              // onChange={(e) => {
              //   submit(e.currentTarget);
              // }}
            />
            {!text ? (
              <div className="buttonSearch ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  width="1.5em"
                  viewBox="100 -860 960 960"
                  fill="#6765e0"
                  // className="svgHome"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </div>
            ) : (
              <div onClick={clearInput} className="buttonSearch deleteSearch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  fill="#ffff"
                  viewBox="-100 -50 860 960"
                  // viewBox="0 -960 960 960"
                >
                  <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
              </div>
            )}
          </Form>
          <br />
        </div>
        <h3>Chats</h3>
        <nav>
          <ul>
            {list.length > 0 ? (
              list.map((openChat, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={"chat/" + openChat}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {openChat}
                    </NavLink>
                  </li>
                )
              })
            ) : (
              <li>Aun no tienes ningun chat abierto</li>
            )}
          </ul>
        </nav>
      </aside>

      <div className="chatHome">
        <div className="titleRoom">
          {/* <h3>Room: {room}</h3> */}
          <h4>Live Chat</h4>
        </div>
        <div className="bodyRoom"></div>
        <Outlet context={{ search, list, setList }} />

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
