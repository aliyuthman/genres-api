const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  res.send("Hello, you are here, at home page ");
});


module.exports = router