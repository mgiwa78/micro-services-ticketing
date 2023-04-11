import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Currentuser Route");
});

export { router as currentuserRouter };
