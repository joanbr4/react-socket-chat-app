export const MessagePublic = ({
  message,
  apodo,
  index,
}: {
  message: string
  apodo: string
  index: number
}) => {
  const color =
    Math.floor(Math.random() * 999) +
    ", " +
    Math.floor(Math.random() * (100 - 50) + 50) +
    "%, " +
    Math.floor(Math.random() * (30 - 0) + 0) +
    "%"
  return (
    <>
      <li key={index} className="lineRoom">
        <span className="userMessage" style={{ color: `hsl(${color})` }}>
          {apodo}:
        </span>
        <span className="msgMessage"> {message}</span>
      </li>
    </>
  )
}
export const MessagePrivate = ({
  message,
  apodo,
  owner,
  index,
}: {
  message: string
  apodo: string
  index: number
  owner: string
}) => {
  return (
    <>
      <li key={index} className="lineRoom">
        <span
          className={
            owner == apodo ? "msgMessage owner" : "msgMessage nonOwner"
          }
        >
          {message}
        </span>
      </li>
    </>
  )
}
