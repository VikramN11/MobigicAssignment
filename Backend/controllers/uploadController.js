const jwt = require('jsonwebtoken');
const Upload = require("../model/Uploadedfile.model");

// GET files
// route "/uploadedFiles/"
// access private
const getFile = async (req, res)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(token){
        jwt.verify(token, 'mobigic', async(err, decoded)=>{
            if(decoded){
                const userId = decoded.userID;
                // const uploadedFiles = await Upload.find();
                const userUploadedFiles = await Upload.find({user: userId});
                res.send({userUploadedFiles});
            }
            else{
                res.send({"message":err.message});
            }
          });
    }
    else{
        res.send({"msg":"Something really wrong"});
    }
    
}


// POST file
// route "/uploadedFiles/userfile"
// access private
const postFile = async (req, res)=>{
    console.log(req.body);
    try {
        const filename = req.file.filename;
        //Save file details to the database
        const upload = new Upload({filename, code : Math.floor(100000 + Math.random()*900000), user : req.user});

        await upload.save();
        console.log(upload);
        res.status(201).json({message : 'File uploaded successfully', upload});

    } catch (error) {
        console.log(error.message);
       res.status(500).json({message: 'Internal server error'}) 
    }
}


// DELETE file
// route "/uploadedFiles/delete/:id"
// access private
const deleteFile = async (req, res)=>{
    const payload = req.body;
    const id = req.params.id;
    const upload = await Upload.findOne({"_id":id});
    const userID_of_upload = upload.user;
    const userID_request = req.user;
    console.log(userID_of_upload, userID_request);
    try {
        if(userID_request !== userID_of_upload){
            res.send({"msg":"You are not Authorized"});
        }
        else{
            await Upload.findByIdAndDelete({"_id":id});
            res.send("Deleted the Blog");
        }
    } 
    catch(err){
        console.log(err.message);
        res.send({"msg":"Something went wrong"});
    }
}


module.exports = {postFile, getFile, deleteFile};