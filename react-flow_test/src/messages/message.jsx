import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
//import datamessage from './datamessage.json'


function Message(){

    const datamessage = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

    const messageJson = datamessage.map(
        (info) => {

            return(
                <tr key={info.id}>
                    <th>{info.id}</th>
                    <th>{info.time}</th>
                    <th>{info.priority}</th>
                    <th>{info.gruppa}</th>
                    <th>{info.status}</th>
                    <th>{info.message}</th>
                </tr>
            )
        }
    )

    return (
        <div>
            <div>
                <h1>Таблица объектов</h1> 
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