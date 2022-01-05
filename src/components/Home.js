function Home() {
    return (
        <div className="home">
            <h1 className="text-title">Quick Chat</h1>
            <br />
            <form onSubmit={(e) => e.preventDefault()}>
                <span className="text-label">Username: </span>
                <br />
                <input className="input" required />
                <br />
                <br />
                <span className="text-label">Room ID*: </span>
                <br />
                <input className="input" required />
                <br />
                <br />
                <button className="btn btn-connect" type="submit">Connect</button>
            </form>
            <br />
            <p className="text-small">* room ID can be any word or phrase.</p>
            <p className="text-small">* Others will be able connect based on Room ID.</p>
        </div>
    )
}

export default Home;
