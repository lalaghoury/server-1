const express = require("express");
const router = express.Router();

const { requireSignin } = require("../middlewares/authMiddleware");

router.get("/", requireSignin, (req, res) => {
  res.status(200).send({ ok: true, success: true });
});

module.exports = router;
