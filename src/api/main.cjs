const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "../.env")}); //configure the api environment
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.SERVER_PORT || "3060";//set the port


//routes
const userRoute = require("./routes/user.cjs");

app.use(cors()); // allow for comms between front and back
app.use(cookieParser());


app.get('/', (req, res) => { // render a simple hello on landing
    res.send('<h1><center>Hello World!</center><h1>')
});

app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`The server is live at: http://127.0.0.1:${port}/`);
})