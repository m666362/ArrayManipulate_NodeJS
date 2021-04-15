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


var router = express();
router.use(express.json());

const port = process.env.PORT || 3000;

router.listen(port, () => {
    console.log("listening at port 3000!!!");
});
