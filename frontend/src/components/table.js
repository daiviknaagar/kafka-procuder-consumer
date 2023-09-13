import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080')

function Table() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageInfo', (partition, offset, value) => {
            setMessages((prevMessages) => [...prevMessages, { partition, offset, value }]);
        });

        return () => {
            socket.off('messageInfo');
        };
    }, []);

    useEffect(() => {
        console.log(messages)
    }, [messages])

    return (
        <div>
            <h1>messageInfo...</h1>
            <table>
                <tr>
                    <th>Partition</th>
                    <th>Offset</th>
                    <th>Message</th>
                </tr>
                {messages.map(({ partition, offset, value }, index) => (
                    <tr key={index}>
                        <td>{partition}</td>
                        <td>{offset}</td>
                        <td>{value}</td>
                    </tr>
                ))}
            </table>
        </div >
    );
}

export default Table;