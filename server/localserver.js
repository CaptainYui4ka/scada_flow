const { json } = require('express');
const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const data = require('./dataPos.json');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let i = 0;

app.ws('/', (res, req) => {
    console.log('ПОДКЛЮЧЕНО')
    setTimeout(function() {
        while ( i < 10) {
            res.send(getRandomInt(50));
            i++;
        }
    }, 5000)
    res.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))