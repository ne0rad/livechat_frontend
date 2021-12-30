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
                        <div className="message-wrap" key={"div" + index}>
                            <Message key={index} message={msg} />
                            {index !== messages.length - 1 && (<hr key={"hr" + index}/>)}
                        </div>
                    )
                })
            }
            <div ref={messageEndRef}></div>
        </div>
    )
}

export default Chat;
