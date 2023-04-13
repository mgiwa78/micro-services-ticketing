import express from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middleware/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentuserRouter };
