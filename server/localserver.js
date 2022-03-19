const { json } = require('express');
const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const fs = require('fs')

const PORT = process.env.PORT || 5000;
const data = require('./dataPos.json');


app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕНО')
    ws.send('ты успешно подключился')
    ws.on('message', (msg) => {
        console.log(JSON.parse(msg))
        fs.writeFileSync('dataPos.json', JSON.stringify(msg));
    })
})

app.listen(PORT, () => console.log('server work', PORT))