function Message({ message, isLast }) {
    return (
        <div className="message">
            <span className="text-message"><b>{message.username}</b>: {message.message}</span>
            {!isLast && <hr />}
        </div>
    )
}

export default Message;
