/*import express from 'express';
import path from 'path'
import WSserver from 'express-ws'*/

const { json } = require('express');
const express = require('express');
const  path = require('path');

//const __dirname = path.resolve();
const app = express();
const WSserver = require('express-ws')(app);
//import fs from 'fs';
const fs = require('fs')
const PORT = process.env.PORT || 5000;
const data = require('./dataPos.json');

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
    //req.sendFile(__dirname, 'signal', 'home.html');
    res.send('<h1>Server Work!!!</h1>')
});


app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕНО')
    /*setTimeout(function() {
        while ( i < 10) {
            res.send(getRandomInt(50));
            i++;
        }
    }, 5000)*/
    ws.send(JSON.stringify(rndArr));
    ws.send(JSON.stringify(rndJArr));
    ws.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))