import { useState, useEffect, useRef, useContext } from "react";
//import { SocketContext } from "../socket/socket";
import Message from "./Message";

function Chat({ user }) {

    const [messages, setMessages] = useState([{ message: "Hello testing" }, { message: "You too!" }]);
    const [messageInput, setMessageInput] = useState("");

    const messageEndRef = useRef(null);
    //const socket = useContext(SocketContext);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    function sendMessage() {
        if (!messageInput) return;
        setMessages([...messages, { message: messageInput }]);
        setMessageInput("");
    }

    return (
        <div className="chat">
            <p className="text-label">Room ID: <b>{user.roomID}</b> | Username: <b>{user.username}</b></p>
            <div className="chatbox">
                {
                    messages.map((msg, index) => {
                        let isLast = index === messages.length - 1;
                        return (
                            <Message key={index} message={msg} isLast={isLast} />
                        )
                    })
                }
                <div ref={messageEndRef}></div>
            </div>
            <div className="newMessage">
                <input
                    type="text"
                    name="newMessage"
                    autoFocus={true}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.currentTarget.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat;
