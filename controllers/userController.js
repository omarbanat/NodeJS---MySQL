const db = require('../config/db');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');
// Initialize Cloud Storage
const storage = getStorage();

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

const addUserImage = async (req, res) => {
  try {
    const image = await FileUpload(req.files.image[0]);
    const file = await FileUpload(req.files.file[0]);

    const result = await db.query(
      `INSERT INTO users (image, file) VALUES (?,?);`,
      [file.downloadURL, image.downloadURL]
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: 'Data added successfully',
    });
  } catch (error) {
    console.error('Error adding new course:', error);
    res.status(400).json({
      success: false,
      message: 'Unable to add new data',
      error: error.message,
    });
  }
};
const FileUpload = async (file) => {
  const dateTime = giveCurrentDateTime();

  const storageRef = ref(
    storage,
    `files/${file.originalname + '       ' + dateTime}`
  );

  // Create file metadata including the content type
  const metadata = {
    contentType: file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);

  console.log('File successfully uploaded.');
  return {
    message: 'file uploaded to firebase storage',
    name: file.originalname,
    type: file.mimetype,
    downloadURL: downloadURL,
  };
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

module.exports = { getAllUsers, addUser, getUserByID, addUserImage };
