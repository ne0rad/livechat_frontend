import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./components/Chat";
import NewMessageForm from "./components/NewMessageForm";
const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);

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
    <div className="main">

      <Chat messages={messages} />
      <NewMessageForm socket={socket} />

    </div>
  );
}

export default App;
