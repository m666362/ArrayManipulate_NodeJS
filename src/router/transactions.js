var express = require("express");
var router = new express.Router();

const Model = require("./../model/Transaction");
const User = require("./../model/User");
const Org = require("./../model/Organization");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(express.json());

const fixUserBalance = async (userId, amount)=>{
    const user = await User.findById(userId);
    if(user.balance<amount){
        return false;
        throw new Error("Insufficient balance");
    }
    user.balance -= amount;
    await user.save();
    return true;
    console.log(user);
}

const fixOrgBalance = async (orgId, amount)=>{
    const org = await Org.findById(orgId);
    org.balance += amount;
    await org.save()
    console.log(org)
}

router.post('/', urlencodedParser, async (req, res) => {
    try {
        const tran = new Model(req.body);
        if(!await fixUserBalance(tran.user, tran.amount))
            return res.send('Insufficient balance')
        await fixOrgBalance(tran.org, tran.amount);
        await tran.save();
        res.send(tran)
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