import { NavLink, Form } from "react-router-dom"

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

export const Navigation = () => {
  return (
    <nav className="Nav">
      <div className="barNav">
        <h3>Chat en vivo!</h3>
        <div className="formNav">
          <Form method="post">
            {/* <form method="post" action="/api/login"> */}
            <input
              type="email"
              className="inputNav"
              name="email"
              placeholder="Write your email"
            />
            <input
              type="password"
              className="inputNav"
              name="passw"
              placeholder="Password"
            />
            <button type="submit" className="butNav">
              Log in
            </button>
          </Form>
          <button className="butNav">
            <NavLink className="butNav" to="/signIn">
              Sign In
            </NavLink>
          </button>
        </div>
      </div>
    </nav>
  )
}
