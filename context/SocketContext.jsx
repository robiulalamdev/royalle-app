import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config";

export const SocketContext = createContext();

export const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const useSocket = () => {
  const data = useContext(SocketContext);
  return data;
};

const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [socketUsers, setSocketUsers] = useState(new Map());
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    const interval = setInterval(() => {
      if (user && user._id) {
        socket.current.emit("addUser", { id: user?._id });
      }
    }, 4000);

    socket.current.on("getUsers", (users) => {
      const usersMap = new Map();
      users?.users.forEach((user) => {
        usersMap.set(user.userId, user);
      });
      setSocketUsers(usersMap);
      // dispatch(setVisitors(users));
    });

    return () => {
      clearInterval(interval);
      socket.current.disconnect();
    };
  }, [user]);

  const contextValue = {
    SOCKET: socket,
    socketUsers,
  };
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
