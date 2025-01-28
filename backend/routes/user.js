const { Router } = require("express");
const { z } = require("zod");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const userRouter = Router();

const JWT_SECRET_USER = "userrandoml235u0ojsdlna";

userRouter.post("/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  //TODO : adding zod validation
  //TODO: hash the password so plaintext pw is not stored in the DB

  try {
    await userModel.create({
      email,
      firstName,
      lastName,
      password,
    });

    res.send({
      message: "User signed up successfully",
    });
  } catch (error) {
    res.send({
      message: "Unable to signed up",
      errorMessage: error,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const userSchema = z.object({
    email: z.string().email().max(50),
    password: z.string().min(6).max(50),
  });

  try {
    const { success, error } = userSchema.safeParse(req.body);

    if (!success) {
      const errorDetails = error.errors.map((e) => e.message).join(", ");
      throw new Error(`Validation failed: ${errorDetails}`);
    }
    const { email, password } = req.body;

    //TODO: hash the password so plaintext pw is not stored in the DB
    // const hashedpassword = await bcrypt.hash(password, 5)
    // const response = bcrypt.compare(password, hashedpassword)

    const user = await userModel.findOne({
      email,
      password,
    });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET_USER
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

userRouter.get("/purchases", (req, res) => {
  res.send({
    message: "User purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
