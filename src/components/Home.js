import { useState } from "react";

function Home({ updateUser }) {

    const [username, setUsername] = useState("");
    const [roomID, setRoomID] = useState("");

    return (
        <div className="home">
            <h1 className="text-title">Live Chat</h1>
            <br />
            <form
                className="container"
                onSubmit={(e) => {
                    e.preventDefault();
                    updateUser({username: username, roomID: roomID});
                }}
            >
                <span className="text-label">Username: </span>
                <br />
                <input
                    type="text"
                    className="input"
                    spellCheck="false"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <br />
                <br />
                <span className="text-label">Room ID*: </span>
                <br />
                <input
                    type="text"
                    className="input"
                    spellCheck="false"
                    required
                    value={roomID}
                    onChange={(e) => setRoomID(e.currentTarget.value)}
                />
                <br />
                <br />
                <button className="btn btn-connect" type="submit">Connect</button>
            </form>
            <br />
            <p className="text-small">* room ID can be any word or phrase.</p>
            <p className="text-small">* others will be able connect based on room ID.</p>
        </div>
    )
}

export default Home;
