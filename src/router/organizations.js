var express = require("express");
var router = new express.Router();

const Model = require("./../model/Organization");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(express.json());

router.post('/', urlencodedParser, async (req, res) => {
    try {
        delete req.body.balance;
        const item = new Model(req.body);
        await item.save();
        res.send(item)
    } catch (e) {
        res.send(e)
    }
})

router.get('/',  async (req, res) => {
    try {
        const items = await Model.find({});
        res.send(items)
    } catch (e) {
        res.send(e)
    }
})

router.get('/:id', urlencodedParser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Model.findById(itemId)
        item.save();
        res.send(item)
    } catch (e) {
        res.send(e)
    }
})

router.put('/:id', urlencodedParser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = await req.body;
        const item = await Model.findByIdAndUpdate(itemId, updates)
        item.save();
        res.send(item)
    } catch (e) {
        res.send(e)
    }
})

// todo: Delete All
router.delete('/', urlencodedParser, async (req, res) => {
    try {
        const result = await Model.collection.drop();
        res.send(result)
    } catch (e) {
        res.send(e)
    }
})

// todo: Delete One
router.delete('/:id', urlencodedParser, async (req, res) => {
    try {
        const itemId = req.params.id;
        var item = await Model.findByIdAndDelete(itemId);
        const result = {
            userInfo: item._doc,
            message: "This item had been deleted successfully!!!"
        }
        res.send(result);
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;