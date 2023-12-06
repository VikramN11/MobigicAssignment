const express = require('express');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const { postFile, getFile, deleteFile } = require('../controllers/uploadController');


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

uploadedFileRouter.get("/", getFile);

uploadedFileRouter.post('/upload', uploadedFile.single('filename'), postFile);

uploadedFileRouter.delete("/delete/:id", deleteFile)


module.exports = uploadedFileRouter