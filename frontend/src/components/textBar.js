import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function Textbar() {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>message...</h1>
            <div id="form">
                <input
                    id='input'
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} type="submit">Send</button>
            </div>
        </div >
    );
}

export default Textbar;