import { useNavigate, useRouteError } from "react-router-dom"

interface IRouterError {
  statusText?: string
  message?: string
}

export function ErrorBoundary() {
  const error: IRouterError = useRouteError() as IRouterError
  console.error(error)
  const navigate = useNavigate()

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message || "Unkown error"}</i>
      </p>
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  )
}
