const { Router } = require("express");
const { adminModel } = require("../db");
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
  res.send({
    message: "User Sign up endpoint",
  });
});

adminRouter.post("/signin", (req, res) => {
  res.send({
    message: "User Sign in endpoint",
  });
});

adminRouter.post("/course", (req, res) => {
  res.send({
    message: "Admin router",
  });
});

adminRouter.put("/course", (req, res) => {
  res.send({
    message: "Admin router",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.send({
    message: "Admin router",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
