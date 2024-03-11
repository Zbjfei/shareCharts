const conn = require('./conn.js');

const monk = require('monk');

const db = monk(conn);

db.then(() => {
  console.log('all ready to Connection  to server  27017');
});

module.exports = db;
