import { NavLink, useOutletContext } from "react-router-dom"
import { createChat } from "../hooks/controllers"
import { UserContext } from "./layouts/UserContext"
import { useContext } from "react"

interface IOutletContextType {
  search: IdataObject[]
  list: string[]
  setList: React.Dispatch<React.SetStateAction<string[]>>
}
interface IdataObject {
  name: string
  surname: string
  nickname: string
  genere: string
}
export function ListUsers() {
  const { userRef } = useContext(UserContext) || {}
  const { search, list, setList } = useOutletContext() as IOutletContextType
  // console.log(search)
  const filterSearch = search.filter(
    (item: IdataObject) =>
      item.nickname !== userRef?.current?.nickname &&
      !list.includes(item.nickname)
  )
  const addUser = async (name: string) => {
    const copyList = [...list]
    copyList.push(name)
    userRef?.current?.nickname && createChat(userRef.current.nickname, name) //confirm exist nickname Value instead if condition

    setList(copyList)
  }

  return (
    <div className="listChatUsers">
      <h1>ListUsers</h1>
      {search.length > 0 ? (
        <ul>
          {filterSearch.map((item: IdataObject, index: number) => (
            <li key={index}>
              <div className="boxUser">
                <div className="photoUser">
                  {/* <img alt="img"></img> */}
                  <span>{item.name}</span>
                </div>
                <button>
                  <NavLink to={"/home/chat/" + item.nickname}>Chat</NavLink>
                </button>
                <button
                  onClick={() => addUser(item.nickname)}
                  value={item.nickname}
                >
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
