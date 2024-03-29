import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useSubmit, Form, Outlet } from "react-router-dom";
// import { socket } from "./socket";
// import { Message } from "./message";
import { UserContext } from "./UserContext";
import { getChats } from "./controllers";

export const loader = async () => {
  // const dataContact = params.id
  const user = localStorage.getItem("user");
  const response = await getChats(String(user));
  const jsonResp = await response.json();
  console.log("json", jsonResp);

  // const data = userRef
  // const response = await fetch(`/user/${dataContact}`)
  return jsonResp;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const dataQuery = Object.fromEntries(formData);
  console.log("as", dataQuery);
};

export const Home = () => {
  const openChats = useLoaderData();
  console.log(openChats);
  // const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  // const { id: room } = useParams()
  const { userRef } = useContext(UserContext);
  // const submit = useSubmit();

  useEffect(() => {});
  // }, [socket])

  // const closeRoom = (room: string) => {
  //   socket.emit("disconect", room)
  // }
  // const queryUSer = (data) => {
  //   // data.submit();
  // };

  return (
    <div className="bodyHome">
      <aside>
        <div className="boxbusquedaHome">
          <Form
          // onChange={(event) => {
          //   submit(event.currentTarget);
          // }}
          >
            <input
              className="busquedaHome"
              type="text"
              name="inputSearch"
              // style={{ height: "100%", width: "100%" }}
              // onChange={(e))}
              // onChange={(e) => {
              //   submit(e.currentTarget);
              // }}
            />
            <button type="submit" className="svgHome">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#6765e0"
                className="svgHome"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </button>
          </Form>
          <br />
        </div>
        <h3>Chats</h3>
        {/* <ul>{openChats ? (
          openChats.map()
        )}</ul> */}
      </aside>

      <div className="chatHome">
        <div className="titleRoom">
          {/* <h3>Room: {room}</h3> */}
          <h4>Live Chat</h4>
        </div>
        <div className="bodyRoom"></div>
        <Outlet />

        <br />
        {/* <button
        onClick={() => {
          navigation(-1)
          closeRoom(room)
        }}
      >
        Volver
      </button> */}
      </div>

      {/* <div className="central">
        <h4>hola</h4>
        <div className="BoxChat">
          <input />
          <button type="submit">Enviar</button>
        </div>
      </div> */}
    </div>
  );
};
