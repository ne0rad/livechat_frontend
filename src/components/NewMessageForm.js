import { useRef, useState } from "react";

function NewMessageForm({ socket }) {

    const [message, setMessage] = useState("");

    const inputRef = useRef(null);

    function sumbmitMessage(e) {
        e.preventDefault();
        if (!message) return;
        socket.emit("chat", message);
        setMessage("");
    }

    return (
        <div className="message-form" onKeyPress={() => inputRef.current.focus()}>
            <form action="#" onSubmit={sumbmitMessage}>
                <input
                    ref={inputRef}
                    className="message-input"
                    autoFocus
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <button type="submit" className="message-btn">Send</button>
            </form>
        </div>
    )
}

export default NewMessageForm;