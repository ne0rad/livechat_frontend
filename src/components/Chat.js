import { useState, useEffect, useRef } from "react";
//import { SocketContext } from "../socket/socket";
import Message from "./Message";

function Chat({ user, disconnect }) {

    const [messages, setMessages] = useState([]);
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
        setMessages([...messages, { message: messageInput, username: user.username }]);
        setMessageInput("");
    }

    return (
        <div className="chat">
            <p className="text-label">Room ID: <b>{user.roomID}</b> | Username: <b>{user.username}</b></p>
            <button className="btn btn-disconnect" onClick={disconnect}>Disconnect</button>
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
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                >
                    <input
                        className="input input-newMessage"
                        type="text"
                        name="newMessage"
                        autoFocus={true}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.currentTarget.value)}
                    />
                    <button className="btn btn-send" type="submit" onClick={(e) => e.currentTarget.blur()}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
