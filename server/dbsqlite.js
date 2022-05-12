const sqlite3 = require('sqlite3').verbose();
let sql;

let time = new Date();
let now = time.toLocaleTimeString();

//connect to database
const db = new sqlite3.Database('./db/signal.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log('connection opened')
});


//create table
//sql = `CREATE TABLE signal(id INTEGER PRIMARY KEY, time, priority, gruppa, status, message)`;
//db.run(sql);


//drop table НЕ ТРОГАТЬ
//db.run(" DROP TABLE signal");


//insert data into signal table
/*sql = `INSERT INTO signal(time, priority, gruppa, status, message) VALUES (?, ?, ?, ?, ?)`;
db.run(sql, [now, "normal", "3", "active", ""], (err) => {
  if (err) return console.error(err.message);
});*/


//update table
/*sql = `UPDATE signal SET gruppa = ? WHERE id = ? `;
db.run(sql, ["1", 3], err => {
  if (err) return console.error(err.message);
})*/

//del table НЕ ТРОГАТЬ
/*sql = `DELETE FROM signal WHERE id = ?`;
db.run(sql, [ ], err => {
  if (err) return console.error(err.message);
})*/


//query the date
sql = `SELECT * FROM signal`;
db.all(sql, [], (err, rows) =>{
  if (err) return console.error(err.message);
    rows.forEach(row => {
      console.log(row);
    })
})