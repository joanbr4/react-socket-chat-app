import { useEffect, useRef, useState } from "react"
import {
  useLoaderData,
  Form,
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom"
import { getChatsWith, getSearch } from "../hooks/controllers"
import { useDebounce } from "../hooks/useDebounce"

export const loader = async () => {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  const response = await getChatsWith(String(user), String(token))
  const jsonResp = await response.json()
  return jsonResp
}

export function useStartDebounce(value: string) {
  const [search, setSearch] = useState([])

  const debounceSearch = useDebounce(value, 200)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSearch(debounceSearch)
      setSearch(response)
      // navigate("/home/browse")
    }
    fetchData()
  }, [debounceSearch])

  return search
}

export const Home = () => {
  const openChats = useLoaderData() as string[]
  const [list, setList] = useState<string[]>([])
  const [text, setText] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>("")
  const [search, setSearch] = useState<object[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (openChats.length > 0) {
      setList(openChats)
    }
  }, [list])

  useEffect(() => {
    if (inputRef?.current?.value == "") {
      setSearch([])
      setText(false)
    }
  }, [textSearch])

  // const debounce = useStartDebounce(textSearch)

  const startDebunce = async (data: string) => {
    // setSearch(debounce)

    const response = await getSearch(data)
    setSearch(response)
    navigate("/home/browse")
    // navigate("/browse/?q=" + data)
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
              name="q"
              ref={inputRef}
              placeholder="Search a user..."
              onChange={(e) => {
                setTextSearch(e.target.value)
                setText(true)
                startDebunce(e.target.value)
              }}
            />
            {!text ? (
              <div className="buttonSearch ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.5em"
                  width="2.5em"
                  viewBox="100 -860 960 960"
                  fill="#6765e0"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </div>
            ) : (
              <div onClick={clearInput} className="buttonSearch deleteSearch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5em"
                  height="2.5em"
                  fill="#ffff"
                  viewBox="180 -70 160 960"
                >
                  <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
              </div>
            )}
          </Form>
          <br />
        </div>
        <nav>
          <h2>Chats</h2>
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
          <h4>Live Chat</h4>
        </div>
        <div className="bodyRoom"></div>
        <Outlet context={{ search, list, setList }} />
        <br />
      </div>
    </div>
  )
}
