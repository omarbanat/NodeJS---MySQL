const db = require('../config/db');

const getAllUsers = async (req, res) => {
  const result = await db.query(`SELECT * FROM users`);
  console.log(result);
};

module.exports = { getAllUsers };
