export const Message = ({
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
