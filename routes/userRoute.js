const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  addUser,
  getUserByID,
  addUserImage,
} = require('../controllers/userController');

const multer = require('multer');

// Setting up multer as a middleware
const upload = multer({ storage: multer.memoryStorage() });

router.get('/getAll', getAllUsers);
router.get('/get/:id', getUserByID);
router.post('/add', addUser);
router.post(
  '/addImage',
  upload.fields([{ name: 'image' }, { name: 'file' }]),
  // upload.single('image'),
  addUserImage
);

module.exports = router;
