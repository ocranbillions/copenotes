const mysql = require('mysql2');

let pool;

function query(sql, params) {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      waitForConnections: true,
      connectionLimit: 20,
    });
  }

  return new Promise((resolve, reject) => {
    const isPreparedStatement = Array.isArray(params);
    if (isPreparedStatement) {
      pool.query(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    } else {
      pool.query(sql, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    }
  });
}

module.exports = { query };
