const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  addUser,
  getUserByID,
} = require('../controllers/userController');

router.get('/getAll', getAllUsers);
router.get('/get/:id', getUserByID);
router.post('/add', addUser);

module.exports = router;
