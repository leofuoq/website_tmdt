const bodyParser = require('body-parser')
const pool = require('../config/database')

const test = async (req, res) => {
    const name = req.body.sttname;
    console.log(">>>> sttname:", name);
    
    pool.query('insert into status( sttname) values ($1)',[name], (err, result) => {
    if (err) {
    console.error('Error executing query', err);
    } else {
    console.log('Query result:', result.rows);
    }
  })
}
module.exports = test