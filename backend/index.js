const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://aatishmongodb:Sourav1stCiena@cluster0.kcfiu.mongodb.net/course-selling-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to the database");
  } catch (e) {
    console.log("Unable to connect to the database");
  } finally {
    app.listen(3000);
  }
}

main();
