// todo: Read these comment
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use array_manupulate // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function

require('./db/mongoose')
const express = require("express");

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const userRouter = require("./router/users");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/users", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("listening at port 3000!!!");
});
