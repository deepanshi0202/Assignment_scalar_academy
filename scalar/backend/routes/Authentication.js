const router = require("express").Router();
const Student = require("../models/Student")
const Mentor = require("../models/Mentor");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
    try {
        console.log(req.body.email);
        const user = await Mentor.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    res: "success",
                    data: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                    }
                })
            }
            else {
                res.json({
                    res: "invalid",
                    data: "Wrong Password"
                })
            }
        }
        else {
            res.json({
                res: "missing",
                data: "No User Found"
            })
        }
    }
    catch (e) {
        console.log(e);
    }
})

router.post("/getUser", async (req, res) => {
    const user = await User.findOne({ _id: req.body.id })
    if (user) {
        res.json({
            res: "success",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
        })
    }
    else
        res.json({
            res: "missing",
            data: "No User Found"
        })
})





router.post("/getAuth", async (req, res) => {
    console.log(req.body);
    const user = await Mentor.findOne({ _id: req.body.id })
    if (user) {
        res.json({
            res: 1,
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        })
    }
    else {
        res.json({
            res: 0,
            message: "No User Found"
        })
    }
})


module.exports = router;