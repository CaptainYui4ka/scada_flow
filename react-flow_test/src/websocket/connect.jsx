import React from 'react'

const socket = new WebSocket('ws://localhost:5000/', "protocolOne");

const Socket = () => {

    socket.onopen = () => {
        setConnected(true);
        console.log('подключено');
    }

    socket.onmessage = (event) => {
        console.log('есть сообщение')
        let mes = JSON.parse(event.data);
        console.log(mes);
    }

    return(
        <div>

        </div>
    )
}