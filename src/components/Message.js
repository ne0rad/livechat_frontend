function Message({ message }) {
    return (
        <div className="message">
            <span className="message-time">[{new Date(message.date).toLocaleTimeString()}] </span>
            <br />
            <span className="message-text">admin: {message.message}</span>
        </div>
    )
}

export default Message;
