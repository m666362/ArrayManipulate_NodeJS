var express = require("express");
var router = new express.Router();

const User = require("./../model/User");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(express.json());

router.post('/', urlencodedParser, async (req, res) => {
    try {
        console.log(req.body);
        const user = new User(req.body);
        await user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

router.get('/',  async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

router.get('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

router.put('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = await req.body;
        const user = await User.findByIdAndUpdate(userId, updates)
        user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

// todo: Delete All
router.delete('/', urlencodedParser, async (req, res) => {
    try {
        const result = await User.collection.drop();
        res.send(result)
    } catch (e) {
        res.send(e)
    }
})

// todo: Delete One
router.delete('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        var user = await User.findByIdAndDelete(userId);
        const result = {
            userInfo: user._doc,
            message: "This user had been deleted successfully!!!"
        }
        res.send(result);
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;