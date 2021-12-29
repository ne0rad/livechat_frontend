import { useEffect, useRef } from "react";
import Message from "./Message";

function Chat({ messages }) {
    const messageEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="chat">
            {
                messages.map((msg, index) => {
                    return (
                        <Message key={index} message={msg} />
                    )
                })
            }
            <div ref={messageEndRef}></div>
        </div>
    )
}

export default Chat;
