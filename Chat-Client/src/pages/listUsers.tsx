import { NavLink, useOutletContext } from "react-router-dom"
import { createChat } from "../hooks/controllers"
import { UserContext } from "./layouts/UserContext"
import { useContext, useEffect, useState } from "react"

interface IOutletContextType {
  search: object[] // Replace YourSearchType with the actual type of search
  list: YourListType // Replace YourListType with the actual type of list
  setList: React.Dispatch<React.SetStateAction<YourListType>> // Replace YourListType with the actual type of list
}
interface IdataObject {
  name: string
  nickname: string
  genereal: string
}
export function ListUsers() {
  const { userRef } = useContext(UserContext) || {}
  const { search, list, setList } = useOutletContext()
  // const [add, setAdd] = useState<boolean>(false)
  // console.log("2sdd", list, search)
  // console.log("context", userRef)
  // console.log("listUsers", listUsers)

  // useEffect(() => {
  //   setList(newArray)
  // }, [add])
  const filterSearch = search.filter(
    (item: IdataObject) =>
      item.nickname !== userRef?.current?.nickname &&
      !list.includes(item.nickname)
  )

  const addUser = async (name: string) => {
    console.log("addUser", name)
    const copyList = [...list]
    copyList.push(name)
    userRef?.current?.nickname && createChat(userRef.current.nickname, name) //confirm exist nickname Value instead if condition
    // console.log("copyList", copyList)

    setList(copyList)
  }

  return (
    <>
      <h1>ListUsers</h1>
      {search.length > 0 ? (
        <ul>
          {filterSearch.map((item: IdataObject, index: number) => (
            <li key={index}>
              <div className="boxUser">
                <img alt="img"></img>
                <p>{item.name}</p>
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
    </>
  )
}
