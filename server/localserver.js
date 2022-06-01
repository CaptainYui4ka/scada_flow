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
while ( i < 10 ) {
    rndArr.push(getRandomInt(50));
    i++;
    fs.writeFileSync('signal.json', JSON.stringify(rndArr));
}

let j = 0;
let rndJArr = [];
while ( j < 10 ) {
    rndJArr.push(getRandomInt(50));
    j++;
}
console.log(rndArr);
console.log(rndJArr);
/*while ( i < 10 ) {
    fs.writeFileSync('signal.json', JSON.stringify(getRandomInt(50)));
    i++;
}*/
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

    //ws.send(JSON.stringify(rndArr));
    //ws.send(JSON.stringify({'arrays': [rndArr, rndJArr], 'data':}));
    //ws.send(JSON.stringify(data))

    ws.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))
