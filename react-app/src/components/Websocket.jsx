import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data) => {
      console.log("onMessage event received", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("Unregistering events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]);

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <div>
      <h1>Websocket Component</h1>
      <div>
        {messages.length === 0 ? (
          <div>No messages</div>
        ) : (
          <div>
            {messages.map((msg) => (
              <p>{msg.content}</p>
            ))}
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
