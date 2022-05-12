import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import datamessage from './datamessage.json'

const socket = new WebSocket('ws://localhost:5000/', "protocolOne");


function Message(){

    socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        console.log('есть сообщение')
        console.log(msg);
    };
    const messageJson = datamessage.map(
        (info) => {
            return(
                <tr>
                    <th>{info.id}</th>
                    <th>{info.data}</th>
                    <th>{info.priority}</th>
                    <th>{info.group}</th>
                    <th>{info.status}</th>
                    <th>{info.message}</th>
                </tr>
            )
        }
    )

    return (
        <div>
            <div>
                <h1></h1> 
            </div>
            <div className="table mt-5">
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>время</th>
                            <th>приоритет</th>
                            <th>группа</th>
                            <th>статус</th>
                            <th>Сообщение</th>
                        </tr>
                    </thead>
                    <tbody>
                            {messageJson}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Message;