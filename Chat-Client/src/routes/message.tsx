export const Message = ({ message, userLine, index }) => {
  const color =
    Math.floor(Math.random() * 999) +
    ", " +
    Math.floor(Math.random() * (100 - 50) + 50) +
    "%, " +
    Math.floor(Math.random() * (30 - 0) + 0) +
    "%"
  console.log("aw", color)
  return (
    <>
      <li key={index} className="lineRoom">
        {/* <div className="userMessage"> */}
        <span className="userMessage" style={{ color: `hsl(${color})` }}>
          {userLine}:
        </span>
        <div className="msgMessage">{message}</div>
        {/* </div> */}
      </li>
      {/* <br /> */}
    </>
  )
}
