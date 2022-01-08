import React, { useState, useEffect } from "react";
import { SocketContext, socket } from "./socket/socket";
import Home from "./components/Home";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   socket.on("chat", newMessage => {
  //     const messagesTemp = [...messages];
  //     if (messagesTemp.length > 100) messagesTemp.splice(0, 1);
  //     messagesTemp.push(newMessage);
  //     setMessages(messagesTemp);
  //   });
  //   return () => {
  //     socket.off("chat");
  //   }
  // }, [messages]);

  // Check if user has any data in local storage.
  // Update app state if they do.
  useEffect(() => {
    let username = window.localStorage.getItem('username');
    let roomID = window.localStorage.getItem('roomID');

    if (username && roomID) {
      setUser({ username: username, roomID: roomID });
    }

    return () => {
      setUser();
    }
  }, []);

  function updateUser(userData) {
    if(!userData || !userData.username || !userData.roomID) return;
    setUser(userData);
  }

  function disconnect() {
    setUser();
  }

  return (
    <SocketContext.Provider value={socket}>
      <div className="main">
        {
          user ?
            (<Chat user={user} disconnect={disconnect}/>)
            :
            (<Home updateUser={updateUser}/>)
        }
      </div>
    </SocketContext.Provider>
  );
}

export default App;
