const router = require("express").Router();
const Mentor = require("../models/Mentor");
const Student = require("../models/Student");



router.get("/getStudents", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({
            res: 1,
            data: students
        })
    }
    catch (e) {
        console.log(e);
    }
})


router.post("/getStudentData", async (req, res) => {
    console.log(req.body.studentID);
    const student = await Student.findOne({ _id: req.body.studentID })
    console.log(student);
    if (student)
        res.json({
            res: 1,
            data: student
        })
    else {
        res.json({
            res: 11
        })
    }
})


router.get("/create", (req, res) => {
    const hash = bcrypt.hashSync("ansh")
    const newMentor = new Mentor({
        name: "Ansh",
        email: "anshthakur.belubhai@gmail.com",
        phone: "6262626262",
        password: hash
    })
    newMentor.save();
    hash = bcrypt.hashSync("tejas")
    newMentor = new Mentor({
        name: "Tejas",
        email: "tejasrana7771@gmail.com",
        phone: "8585858585",
        password: hash
    })
    newMentor.save();
    hash = bcrypt.hashSync("deepanshi")
    newMentor = new Mentor({
        name: "Deepanshi",
        email: "deepanshiaggarwal0202@gmail.com",
        phone: "9898989898",
        password: hash
    })
    newMentor.save();
    res.send("done");
})


router.get("/createStudents", (req, res) => {
    for (let i = 0; i < 20; i++) {
        const newStudent = new Student({
            name: `student${i}`,
            email: `student${i}@gmail.com`,
            phone: Math.floor(1000000000 + Math.random() * 9000000000),
            uid: `20bcs${i}`,
            mentorAssigned: false,
            evalSubmit: false
        })
        newStudent.save();
    }
    res.send("Done");
})

module.exports = router;