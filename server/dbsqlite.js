const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memmory:')
const json = require('./dataPos.json')
let id = JSON.parse(json);

var now = new Date().toLocaleTimeString();

/*db.run(
  `CREATE TABLE signal (time, priority, groups, status, id)`
)*/

//db.serialize(function () {

  
  /*const sql = `INSERT INTO signal (time, priority, groups, status, id) 
              VALUES('?','?','?','?','?')`;

  db.run(sql,[now, 'very tall', '', 'active', 1], (err) => {
    if(err) return console.error(err.message);

    console.log('запись добавлена')
  })*/

  //db.run()

  /*db.close((err) => {
    if (err) return console.error(err.message)
  });
})*/