const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/User.route');
const { authenticate } = require('./middleware/authenticate.middleware');
const uploadedFileRouter = require('./routes/Uploadedfile.route');

require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
  


//route for Home Page
app.get("/", (req, res)=>{
    res.send("Welcome to Home Page");
})

//route for user registration, login and getting Users
app.use("/users", userRouter);

app.use(authenticate);


app.use("/uploadedFiles", uploadedFileRouter);

app.listen(port, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running at port ${port}`);
})