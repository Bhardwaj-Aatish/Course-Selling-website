const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");
const adminRouter = Router();

const JWT_SECRET_ADMIN = process.env.JWT_ADMIN_SECRET;

adminRouter.post("/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  //TODO : adding zod validation
  //TODO: hash the password so plaintext pw is not stored in the DB

  try {
    await adminModel.create({
      email,
      firstName,
      lastName,
      password,
    });

    res.send({
      message: "Admin signed up successfully",
    });
  } catch (error) {
    res.send({
      message: "Unable to signed up",
      errorMessage: error,
    });
  }
});

adminRouter.post("/signin", async (req, res) => {
  //TODO : adding zod validation --> done
  const adminSchema = z.object({
    email: z.string().email().max(50),
    password: z.string().min(6).max(50),
  });

  try {
    const { success, error } = adminSchema.safeParse(req.body);

    if (!success) {
      const errorDetails = error.errors.map((e) => e.message).join(", ");
      throw new Error(`Validation failed: ${errorDetails}`);
    }
    const { email, password } = req.body;

    //TODO: hash the password so plaintext pw is not stored in the DB
    // const hashedpassword = await bcrypt.hash(password, 5)
    // const response = bcrypt.compare(password, hashedpassword)

    const admin = await adminModel.findOne({
      email,
      password,
    });

    if (admin) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        JWT_SECRET_ADMIN
      );

      res.send({
        token,
      });
    } else {
      res.send({
        message: "You are not allowed",
      });
    }
  } catch (error) {
    res.send({
      message: "Error facing while signing",
      errorMessage: error.message,
    });
  }
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
