import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import "express-async-errors";

import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/siginin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middleware/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

const port = 3000;

app.use(json());

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// app.all("*", async (req, res, next) => {
//   next(new NotFoundError());
// });

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`Main Route on ${port}!!!!`);
  });
};

start();
