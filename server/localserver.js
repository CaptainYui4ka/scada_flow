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
let rndArr = [];
while ( i < 10 ) {
    rndArr.push(getRandomInt(50));
    i++;
    fs.writeFileSync('signal.json', JSON.stringify(rndArr));
}
console.log(rndArr);
/*while ( i < 10 ) {
    fs.writeFileSync('signal.json', JSON.stringify(getRandomInt(50)));
    i++;
}*/
i = 0;

app.ws('/', (res, req) => {
    console.log('ПОДКЛЮЧЕНО')
    /*setTimeout(function() {
        while ( i < 10) {
            res.send(getRandomInt(50));
            i++;
        }
    }, 5000)*/
    res.send(JSON.stringify(rndArr));
    res.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))