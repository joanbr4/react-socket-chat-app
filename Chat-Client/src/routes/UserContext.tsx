import { ReactNode, createContext, useContext, useState } from "react"
import { Props } from "react-select/base"

const UserContext = createContext(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)

  const login = (userData: any) => {
    setUser(userData)
  }
  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
