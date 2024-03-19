import { Form, Outlet, redirect, useActionData } from "react-router-dom"
import { Navigation } from "./navigation"
// import { Footer } from "./footer"

export const loader = async () => {
  // console.log(result)
  // const socket = io()
  return "hola"
}

// export const action = async ({ request }: { request: Request }) => {
//   const dataForm = await request.formData()
//   const data = Object.fromEntries(dataForm)
//   const payload = { datos: data }
//   console.log(payload)
//   const result = await fetch("/login", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   })
//   if (result.status === 400) {
//     return "hola"
//   }
//   return redirect("/game")
// }

const MainLayout = () => {
  // const dataAction = useActionData()
  return (
    <>
      <Navigation />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export { MainLayout }
