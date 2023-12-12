const express = require('express');

const fs = require('fs');

const jwt = require('jsonwebtoken');

const multer = require('multer');

const { postFile, deleteFile, getFiles, getFile } = require('../controllers/uploadController');


const uploadedFileRouter = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const destination = '../uploadedfiles';
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }
        cb(null, destination);
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//Multer Upload
const uploadedFile = multer({storage : storage}).single('file');

uploadedFileRouter.get("/", getFiles);

uploadedFileRouter.post('/upload', uploadedFile, postFile);

uploadedFileRouter.get('/:id', getFile);

uploadedFileRouter.delete("/delete/:id", deleteFile)


module.exports = uploadedFileRouter