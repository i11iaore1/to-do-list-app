import { UserContext } from "../App";
import { API_URL_WS, ACCESS_TOKEN } from "../constants";
import { useEffect, useRef, useState, useContext } from "react";
import createApi from "../api";

function UserCard({ userCardObject }) {
  return (
    <div className="flex w-full flex-row gap-x-[var(--gap)] overflow-hidden leading-none text-accent text-[length:var(--normal-font-size)]">
      <div className="px-[var(--gap)] font-bold">{userCardObject.id}</div>
      <div className="whitespace-nowrap text-ellipsis overflow-hidden">
        {userCardObject.username}
      </div>
    </div>
  );
}

export function OnlineTabContent() {
  const { storedAs } = useContext(UserContext);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = useRef(null);

  function handleWSMessage(data) {
    const event = data.event;
    if (event === "user_in") {
      const newUser = data.user;
      setOnlineUsers((prevOnlineUsers) => [newUser, ...prevOnlineUsers]);
    } else if (event === "user_out") {
      const userId = data.id;
      setOnlineUsers((prevOnlineUsers) =>
        prevOnlineUsers.filter((user) => user.id !== userId)
      );
    } else {
      console.error("Unknown event: ", event);
    }
  }

  useEffect(() => {
    async function fetchOnlineDataAndConnect() {
      try {
        const api = createApi(storedAs);
        const response = await api.get(`/api/online/`);

        if (response.status === 200) {
          console.log("Online users: ", response.data);

          setOnlineUsers(response.data);

          AdminSocketConnect();
        } else {
          console.log("Couldn't get online info in onlineTab.jsx");
          // setError("Couldn't get online info in onlineTab.jsx");
        }
      } catch (error) {
        console.error("Error getting online info in onlineTab.jsx: ", error);
        // setError("Error getting online info in onlineTab.jsx");
      }
      // finally {
      //   setIsLoading(false);
      // }
    }

    function AdminSocketConnect() {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }

      let access;
      if (storedAs === 1) {
        access = localStorage.getItem(ACCESS_TOKEN);
      } else if (storedAs === 2) {
        access = sessionStorage.getItem(ACCESS_TOKEN);
      }

      socketRef.current = new WebSocket(
        `${API_URL_WS}/ws/online/?token=${access}`
      );

      socketRef.current.onopen = () => {
        console.log("AdminSocket opened");
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WS receive: ", data);
        handleWSMessage(data);
      };

      socketRef.current.onclose = () => {
        console.log("AdminSocket closed");
      };
    }

    fetchOnlineDataAndConnect();

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <div className="flex p-[var(--gap)] leading-none text-accent text-[length:var(--bigger-font-size)] font-bold">
        List of online users:
      </div>
      <div className="flex flex-col p-[var(--gap)] gap-y-[var(--gap)]">
        {onlineUsers.map((userCardObject) => (
          <UserCard key={userCardObject.id} userCardObject={userCardObject} />
        ))}
      </div>
    </>
  );
}
