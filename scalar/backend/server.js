const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(cors())
mongoose.connect("mongodb://localhost:27017/assessmentDb")


/************* Importing Routes *********/
const authRoute = require("./routes/Authentication");
app.use(authRoute)
const dataRoute = require("./routes/Data")
app.use(dataRoute)
const taskRoute = require("./routes/MentorTasks");
app.use(taskRoute)

app.get("/", (req, res) => {
    res.send("Server Up And Running");
})




app.listen(3001, () => {
    console.log("App running on port 3001");
})