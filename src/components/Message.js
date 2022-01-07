function Message({ message, isLast }) {
    return (
        <div className="message">
            <span className="message-text">[admin]: {message.message}</span>
            {!isLast && <hr />}
        </div>
    )
}

export default Message;
