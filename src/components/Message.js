function Message({ message }) {
    return (
        <div className="message">
            <span className="message-text">[admin]: {message.message}</span>
        </div>
    )
}

export default Message;
