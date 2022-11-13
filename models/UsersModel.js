const pool = require('../config/database').pool,
  bcrypt = require('bcrypt'),
  saltRounds = 10;


exports.create = async (user) => {
  const { name, email, password } = user;
  return bcrypt.hash(password, saltRounds)
    .then(async hash => {
      let sqlQuery = "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, 'user')"
      return await pool
        .then(connection => connection.query(sqlQuery, [name, email, hash])) 
        .catch(err => {
          console.log(err);
          throw new Error();
        })
    })
}

exports.findById = async (id) => {
  console.log('model find by id =>', id);
  let sqlQuery = "SELECT * FROM user WHERE id = ?";
  return await pool
    .then(connection => connection.query(sqlQuery, [id]))
    .catch(err => {
      console.log(err);
      throw new Error();
    })
}

exports.findByName = async (name) => {
  let sqlQuery = "SELECT * FROM user WHERE name = ?";
  return await pool
    .then(connection => connection.query(sqlQuery, [name]))
    .catch(err => {
      console.log(err);
      throw new Error();
    })
}

exports.findByEmail = async (email) => {
  let sqlQuery = "SELECT * FROM user WHERE email = ?";
  return await pool
    .then(connection => connection.query(sqlQuery, [email]))
    .catch(err => {
      console.log(err);
      throw new Error();
    })
}
