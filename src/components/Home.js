import { useContext, useState } from "react";
import { SocketContext } from "../socket/socket";

function Home({ updateUser }) {

    const [username, setUsername] = useState("");
    const [roomID, setRoomID] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const socket = useContext(SocketContext);

    function handleSubmit(e) {
        if(loading) return;
        setLoading(true);
        e.preventDefault();
        try {
            socket.emit('join', { username, roomID }, error => {
                if (error) {
                    setError(error);
                    setLoading(false);
                    return;
                }
                else {
                    setError();
                    setLoading(false);
                    updateUser({ username: username, roomID: roomID });
                    return;
                }
            })
        } catch {
            setError("Could not connect.");
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <h1 className="text-title">Live Chat</h1>
            <br />
            <form
                className="container"
                onSubmit={handleSubmit}
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
                {error && (<p className="text-error">{error}</p>)}
                <button className="btn btn-connect" type="submit" disabled={loading}>Join</button>
            </form>
            <br />
            <p className="text-small">* room ID can be any word or phrase.</p>
            <p className="text-small">* others will be able connect based on room ID.</p>
        </div>
    )
}

export default Home;
