const router = require("express").Router();
const Student = require("../models/Student")
const Mentor = require("../models/Mentor")

router.post("/assignMentor", async (req, res) => {
    console.log(req.body);
    const totalStudentsAssigned = await Student.find({ mentor: req.body.mentorId });
    if (totalStudentsAssigned.length == 4)
        return res.json({
            res: 11
        })
    const mentorName = await Mentor.findOne({ _id: req.body.mentorId })
    await Student.findOneAndUpdate({ _id: req.body.studentId }, { mentorAssigned: true, mentor: req.body.mentorId, mentorName: mentorName.name })
    const AllStudents = await Student.find({})
    res.json({
        res: 1,
        data: AllStudents
    })
})


router.post("/evaluate", async (req, res) => {
    console.log(req.body.evaluation);
    await Student.findOneAndUpdate({ _id: req.body.studentId }, { evaluation: req.body.evaluation })
    const student = await Student.findOne({ _id: req.body.studentId });
    console.log(student);
})


router.post("/submitEvaluation", async (req, res) => {
    await Student.findOneAndUpdate({ _id: req.body.studentId }, { evalSubmit: true })
    const students = await Student.find({ mentor: req.body.mentorId })
    res.json({
        res: 1,
        data: students
    })
})


router.post("/deleteStudent", async (req, res) => {
    console.log(req.body.mentorId);
    const totalStudentsAssigned = await Student.find({ mentor: req.body.mentorId })
    if (totalStudentsAssigned.length <= 3)
        return res.json({
            res: 11
        })
    await Student.findOneAndUpdate({ _id: req.body.studentId }, { mentorAssigned: false, mentor: "" })
    const students = await Student.find({ mentor: req.body.mentorId })
    res.json({
        res: 1,
        data: students
    })
})

router.post("/assignedStudents", async (req, res) => {
    const requiredStudents = await Student.find({ mentor: req.body.mentorId })
    res.json({
        res: 1,
        data: requiredStudents
    })
})


module.exports = router;