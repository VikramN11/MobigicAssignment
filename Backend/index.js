const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/User.route');
const { authenticate } = require('./middleware/authenticate.middleware');

require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

//route for Home Page
app.get("/", (req, res)=>{
    res.send("Welcome to Home Page");
})

//route for user registration, login and getting Users
app.use("/users", userRouter);

app.use(authenticate);



app.listen(port, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running at port ${port}`);
})