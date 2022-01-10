function Message({ message, isLast }) {
    return (
        <div className="message">
            {message.type === 'notification' ? (
                <span className="text-notification"><b>{message.message}</b></span>
            ) :
                (
                    <span className="text-message"><b>{message.username}</b>: {message.message}</span>
                )}
            {!isLast && <hr />}
        </div>
    )
}

export default Message;
