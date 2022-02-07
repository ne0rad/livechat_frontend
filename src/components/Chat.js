import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../socket/socket";
import Message from "./Message";

function Chat({ user, disconnect }) {

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messageEndRef = useRef(null);
    const socket = useContext(SocketContext);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });
        socket.on('notification', notification => {
            setMessages([...messages, { message: notification, username: "SYS", type: 'notification' }]);
        });
        return () => {
            socket.off('message');
            socket.off('notification');
        }
    }, [socket, messages]);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView();
    }

    function sendMessage() {
        if (!messageInput || loading) return;
        setLoading(true);
        setMessageInput("");
        setMessages([...messages, { message: messageInput, username: user.username }]);
        socket.emit('sendMessage', messageInput, error => {
            if (error) {
                setLoading(false);
                setMessages([...messages, { message: "Error sending message", username: "SYS", type: 'notification' }]);
                return;
            } else {
                setLoading(false);
            }
        })
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
                        if (loading) return;
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
                    <button
                        className="btn btn-send"
                        type="submit"
                        onClick={(e) => e.currentTarget.blur()}
                        disabled={loading}
                    >Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
