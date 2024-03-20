import Select from "react-select"
import { Form, Link, redirect, useActionData } from "react-router-dom"

export const action = async ({ request }: { request: Request }) => {
  const dataForm = await request.formData()
  const payload = { data: Object.fromEntries(dataForm) }
  console.log(payload)
  const response = await fetch("/register", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    // body: { datos: payload },
    body: JSON.stringify(payload),
  })
  console.log(response.status)
  if (response.status === 200) return redirect("/")
  return "ERror!!general"
}

export const Register = () => {
  const errorLoader = useActionData()
  const options = [
    { value: "he/him", label: "He/him" },
    { value: "she/her", label: "She/Her" },
    { value: "other", label: "they/them" },
  ]

  return (
    <div className="registerBody">
      <h1> Welcome to this new Chat Live!!</h1>
      <Form method="post" className="dataForm">
        {/* <form method="post" action="/register"> */}
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="surname">Surname</label>
        <input type="text" name="surname" id="surname" />

        <label htmlFor="name">Genere</label>
        <div style={{ width: "250px" }}>
          <Select options={options} name="genere" />
        </div>

        <label htmlFor="nickname">Nickname</label>
        <input type="nickname" name="nickname" id="nickname" />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Register</button>
        {/* {errorLoader.length > 0 && <p>{errorLoader}</p>} */}
      </Form>
      <button>
        <Link to="/">Volver</Link>
      </button>
    </div>
  )
}

export default Register
