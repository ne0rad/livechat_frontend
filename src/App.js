import React, { useState, useEffect } from "react";
import { SocketContext, socket } from "./socket/socket";
import Home from "./components/Home";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat", newMessage => {
      const messagesTemp = [...messages];
      if (messagesTemp.length > 100) messagesTemp.splice(0, 1);
      messagesTemp.push(newMessage);
      setMessages(messagesTemp);
    });
    return () => {
      socket.off("chat");
    }
  }, [messages]);


  return (
    <SocketContext.Provider value={socket}>
      <div className="main">
        <Home />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
