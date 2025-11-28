const { db } = require('../database/connection');

module.exports = {
  findByEmailOrUsername(email, username) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [email, username],
        (err, row) => {
          if (err) return reject(err);
          resolve(row || null);
        }
      );
    });
  },

  findOne({ email, username }) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM users WHERE ';
      let params = [];
      if (email) {
        query += 'email = ?';
        params.push(email);
      } else {
        query += 'username = ?';
        params.push(username);
      }
      db.get(query, params, (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    });
  },

  create({ username, email, password_hash }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [username, email, password_hash],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  }
};