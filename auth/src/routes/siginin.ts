import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import jwt from "jsonwebtoken";

import { ValidateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email mst be walid"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      throw new BadRequestError("Invalid Login credentials");
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Login credentials");
    }

    const existingUserJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on the session obj
    req.session = { jwt: existingUserJwt };

    res.status(201).send("Signed In Success");
  }
);

export { router as signinRouter };
