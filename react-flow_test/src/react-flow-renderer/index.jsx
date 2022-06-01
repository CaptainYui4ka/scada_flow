import React, { useState, useEffect, useCallback } from 'react';
import "./styles.css";
import ReactFlow, {
    removeElements,
    updateEdge,
    addEdge,
    Background,
    MiniMap,
    Controls,
    useZoomPanHelper
} from 'react-flow-renderer';

import { nodeTypes } from './Nodes';
import styleConnect from './style-connect';

const socket = new WebSocket('ws://localhost:5000/', "protocolOne");

const ReactFlowRenderer = () => {
    const [ elements, setElements] = useState([styleConnect]);
    const [ name, setName] = useState("");
    const [ activeNode, setActiveNode] = useState();
    const [ newName, setNewName] = useState("");
    const [ instance, setInstance] = useState();
    const [ connected, setConnected ] = useState(false);
    const [ dataDB, setDataDB ] = useState('');

    useEffect(() => {
        if (activeNode) setNewName(activeNode.data.label);
    }, [activeNode]);

    const elementRemoveHandler = (elementTobeRemoved) => {
        setElements((prev) => removeElements(elementTobeRemoved, prev));
    };

    const connectHandler = (params) => {
        setElements((els) =>
            addEdge({ ...params, type: 'smoothstep', style: { stroke: '#FF0000' }, animated: true }, els))
    };

    const addRectangleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "rectangle",
            position: {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setElements((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const addCircleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "circle",
            position: {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setElements((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const addTriangleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "triangle",
            position: {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };
        setElements((prev) => {
            return [...prev, newNode];
        });
        setName("");

    };

    const addTextHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "text",
            position: {
                x: 0,
                y: 0
            }
        };
        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setElements((prev) => {
            return [...prev, newNode];
        });
        setName("");
    };

    const edgeUpdateHandler = (oldEdge, newConnection) =>
        setElements((els) => updateEdge(oldEdge, newConnection, els));

    const clickHandler = (e) => {
        var htmlString = e.target.outerHTML.toString();
        var index = htmlString.indexOf(` id="`);
        index += 5;
        const currentId = htmlString.substr(index, 13);

        elements.forEach((_current) => {
            if (_current.id === currentId) {
                setActiveNode(_current);
            }
        });
        // setNewName(activeNode.data.label)
    };

    const updateNodeHandler = () => {
        if (!activeNode) return;
        setElements(
            elements.map((_current) => {
                if (_current.id === activeNode.id) {
                    return {
                        ..._current,
                        data: { label: newName, id: _current.data.id }
                    };
                }
                return _current;
            })
        );
    };

    const onLoad = (reactFlowInstance) => {
        setInstance(reactFlowInstance);
        reactFlowInstance.fitView();
    };

    socket.onopen = () => {
        setConnected(true);
        console.log('подключено');
    }

    /*
    socket.onmessage = (event) => {
        console.log('есть сообщение')
        const lineSignal = JSON.parse(event.data);
        console.log(lineSignal);
        let linedate = event.data;
        console.log(linedate);
        let json = JSON.stringify(linedate);
        console.log(json);
        let fileName = 'signal.json'

        let fileToSave = new Blob([JSON.stringify(json, null, 4)], {
            type: 'application/json',
            name: fileName
        })
        saveAs (fileToSave, fileName);
    }
    */

    socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        console.log('есть сообщение')
        console.log(msg);
        //localStorage.setItem('data', msg);
        //let db = msg.data;
        //console.log(db);
        //localStorage.setItem('data', db);
        showMessage(event.data);
    };

    function showMessage(message) {
        var messageSignal = document.createElement('div');
        messageSignal.appendChild(document.createTextNode(message));
        setDataDB(JSON.parse(message));
    }

    //console.log(dataDB);
    let dataDatabase = dataDB.data;
    console.log(dataDatabase);
    //localStorage.setItem('data', JSON.stringify(dataDatabase))
    

    //save pos
    const saveChangesHandler = () => {
        console.log("state", instance.getElements());
        //сохранение в локальное хранилище
        //localforage.setItem('position', JSON.stringify(instance.getElements()));
        localStorage.setItem('position', JSON.stringify(instance.getElements()));
        //отправка json
        let pos = JSON.stringify(instance.getElements());
        socket.send(pos);
    }
    
    /*const onSave = useCallback(() => {
        if (instance) {
            const flow = instance.toObject();
            localforage.setItem("Position", flow)
        }
    })*/

    /*const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = await localforage.getItem("Position");

            if(flow){
                const[x = 0, y = 0] = flow.position;
                setElements(flow.elements || []);
                transform({ x, y, zoom: flow.zoom || 0});
            }
        };
        restoreFlow();
    }, [setElements, transform]);*/

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто')
        } else {
            console.log('Обрыв соединения')
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason)
    }

    socket.onerror = function (event) {
        console.log(event);
    }


    return (
        <div
            style={{
                height: "75vh",
                width: "75vw",
                border: "1px solid black",
                marginLeft: "12.5vw"
            }}
        >
            <ReactFlow
                elements={elements}
                onElementsRemove={elementRemoveHandler}
                onConnect={connectHandler}
                deleteKeyCode={8 || 46}
                onEdgeUpdate={edgeUpdateHandler}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={[16, 16]}
                connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
                onDoubleClick={clickHandler}
                onLoad={onLoad}
            >
                <Background variant="dots" gap={15} size={2} color="#c8c8c8" />

                <MiniMap
                    nodeColor={(node) => {
                        switch (node.type) {
                            case "rectangle":
                                return "red";
                            case "circle":
                                return "#00ff00";
                            case "triangle":
                                return "rgb(0,0,255)";
                            default:
                                return "#eee";
                        }
                    }}
                />

                <Controls />
            </ReactFlow>

            <div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter new node name"
                />

                <button type="button" onClick={addRectangleHandler}>
                    Create Rectangle
                </button>

                <button type="button" onClick={addCircleHandler}>
                    Create Circle
                </button>

                <button type="button" onClick={addTriangleHandler}>
                    Create Triangle
                </button>

                <button type="button" onClick={addTextHandler}>
                    Plain text
                </button>
            </div>

            <div>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                />

                <button type="button" onClick={updateNodeHandler}>
                    Обновить состояние фигуры
                </button>
            </div>
            <div>
                <button type="button" onClick={saveChangesHandler}>
                    Сохранение
                </button>
                {/*<button type="button" onClick={onSave}>
                    Сохранение в localStorage
                </button>
                <button type="button" onClick={onRestore}>
                    Загрузка
                </button>*/}
                {/* Сделать кнопку которая открывает модальное окно modal.jsx */}
                {/*<Message/>*/}
            </div>
        </div>
    );
};

export default ReactFlowRenderer;