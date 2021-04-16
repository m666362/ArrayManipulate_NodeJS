var express = require("express");
var router = new express.Router();

const Model = require("./../model/User");
const Tran = require("./../model/Transaction");

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.use(express.json());

router.post('/', urlencodedParser, async (req, res) => {
    try {
        console.log(req.body);
        const user = new Model(req.body);
        await user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})


const findDonations = async (user) => {

    user = mongoose.Types.ObjectId(user)
    const tran = await Tran.aggregate([

        {
            $match: {
                user: user,
            }
        },
        {
            $lookup: {
                from: "orgs",
                localField: "org",
                foreignField: "_id",
                as: "org"
            }
        },
        {
            $unwind: "$org"
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: "$_id",
                donar: "$user.name",
                orgName: "$org.name",
                date: "$date",
                balance: "$amount"
            }
        }
    ]);
    let length = tran.length;
    return tran[length-1];
};

router.get("/lastDonation/:id", urlencodedParser, async (req, res) => {
    try {
        const user = req.params.id;
        const trans = await findDonations(user);
        res.send(trans);
    } catch (e) {
        console.log(e)
        res.send(e);
    }
});

router.get('/',  async (req, res) => {
    try {
        const users = await Model.find({});
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

router.get('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Model.findById(userId)
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
        const user = await Model.findByIdAndUpdate(userId, updates)
        user.save();
        res.send(user)
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
        const userId = req.params.id;
        var user = await Model.findByIdAndDelete(userId);
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