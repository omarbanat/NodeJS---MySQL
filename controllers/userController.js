const db = require('../config/db');

const getAllUsers = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: 'Users data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new user',
      error,
    });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, DOB, role } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO users (name, email, password, DOB, role) VALUES (?,?,?,?,?);`,
      [name, email, password, DOB, role]
    );
    // const result = await db.query(
    //   `INSERT INTO users (name, email, password, DOB, role) VALUES ('${name}','${email}','${password}','${DOB}','${role}');`
    // );
    console.log(result);
    res.status(201).json({
      success: true,
      message: 'User added successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new user',
      error,
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM users WHERE id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to add new user',
      error,
    });
  }
};

module.exports = { getAllUsers, addUser, getUserByID };
