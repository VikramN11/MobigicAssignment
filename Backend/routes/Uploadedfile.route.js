const express = require('express');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const { postFile, getFile } = require('../controllers/uploadController');


const uploadedFileRouter = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploadedfiles/');
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//Multer Upload
const uploadedFile = multer({storage : storage});

uploadedFileRouter.post('/upload', uploadedFile.single('filename'), postFile);

uploadedFileRouter.get("/", getFile)

module.exports = uploadedFileRouter