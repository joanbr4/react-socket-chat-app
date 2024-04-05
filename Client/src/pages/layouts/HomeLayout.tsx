import { Outlet } from "react-router-dom"
import { Navigation } from "../../components/navigation"

const HomeLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export { HomeLayout }
