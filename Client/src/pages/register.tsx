import Select from "react-select"
import { Form, Link, redirect, useActionData } from "react-router-dom"
import { SigInSchema, FormData } from "../zod/signInUp"

export const action = async ({ request }: { request: Request }) => {
  const dataForm = await request.formData()
  const dataObject = Object.fromEntries(dataForm) as FormData
  const validationResult = SigInSchema.safeParse({
    name: dataObject.name,
    surname: dataObject.surname,
    genere: dataObject.genere,
    nickname: dataObject.nickname,
    password: dataObject.password,
    email: dataObject.email,
  })
  console.log(validationResult)
  if (!validationResult.success) {
    // Convertir los errores de Zod en un formato más amigable para la UI
    const formattedErrors = validationResult.error.issues.reduce(
      (acc: { [key: string]: string }, current) => {
        acc[current.path[0] as string] = current.message
        return acc
      },
      {}
    )
    return formattedErrors
  } else {
    const payload = { data: dataObject }
    const response = await fetch("/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      // body: { datos: payload },
      body: JSON.stringify(payload),
    })
    if (response.status === 200) return redirect("/")
    return "ERror!!general"
  }
}

export const Register = () => {
  const errorLoader = useActionData() as FormData
  const options = [
    { value: "he/him", label: "He/him" },
    { value: "she/her", label: "She/Her" },
    { value: "other", label: "they/them" },
  ]

  return (
    <div className="registerBody">
      <h1> Welcome to this new Chat Live!!</h1>
      <div className="boxForm">
        <Form method="post" className="dataForm">
          {/* <form method="post" action="/register"> */}
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="inputRegister" />
          {errorLoader?.name && (
            <p className="textoError">{errorLoader?.name}</p>
          )}
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            id="surname"
            className="inputRegister"
          />
          {errorLoader?.surname && (
            <p className="textoError">{errorLoader?.surname}</p>
          )}

          <label htmlFor="name">Genere</label>
          <div style={{ width: "250px" }}>
            <Select options={options} name="genere" />
          </div>
          {errorLoader?.genere && (
            <p className="textoError">{errorLoader?.genere}</p>
          )}

          <label htmlFor="nickname">Nickname</label>
          <input
            type="nickname"
            name="nickname"
            id="nickname"
            className="inputRegister"
          />
          {errorLoader?.nickname && (
            <p className="textoError">{errorLoader?.nickname}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="inputRegister"
          />
          {errorLoader?.email && (
            <p className="textoError">{errorLoader?.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="inputRegister"
          />
          {errorLoader?.password && (
            <p className="textoError">{errorLoader?.password}</p>
          )}

          <button type="submit" className="buttonForm">
            Register
          </button>
          {/* {errorLoader.length > 0 && <p>{errorLoader}</p>} */}
        </Form>
      </div>
      <button className="buttonBack">
        <Link to="/" style={{ color: "white" }}>
          Volver
        </Link>
      </button>
    </div>
  )
}

export default Register
