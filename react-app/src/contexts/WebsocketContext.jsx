import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:9000");
export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;
