// Импорт библиотек
const { json } = require('express');
const express = require('express');
const  path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const WSserver = require('express-ws')(app);
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const data = require('./dataPos.json');
const db = new sqlite3.Database('./db/signal.db')



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let i = 0;
let rndArr = [];
while ( i < 20 ) {
    rndArr.push(getRandomInt(50));
    i++;
    fs.writeFileSync('signal.json', JSON.stringify(rndArr));
}

let j = 0;
let rndJArr = [];
while ( j < 20 ) {
    rndJArr.push(getRandomInt(50));
    j++;
}
i = 0;

app.get('/', (req, res) => {
    res.send('<h1>Server Work!!!</h1>')
});


app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕНО')
    db.serialize(function () {
        db.all(`SELECT * FROM signal`, function (err, rows){
            ws.send(JSON.stringify({'arraysone': rndArr,'arraystwo':rndJArr, 'data': rows}));
        });
    });
    db.close();
    console.log(rndArr);
    console.log(rndJArr);

    ws.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))
