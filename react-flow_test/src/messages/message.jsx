import React from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import datamessage from './datamessage.json'



function Message(){

    const messageJson = datamessage.map(
        (info) => {
            return(
                <tr>
                    <th>{info.id}</th>
                    <th>{info.data}</th>
                    <th>{info.priority}</th>
                    <th>{info.group}</th>
                    <th>{info.status}</th>
                    <th>{info.___}</th>
                </tr>
            )
        }
    )

    return (
        <div>
            <div>
                <h1>Message page</h1> 
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
                            <th>___</th>
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