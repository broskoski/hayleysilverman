const express = require("express");
const router = express.Router();

const Arena = require("../lib/arena");

router.get("/", (req, res, next) => {
  const arena = new Arena();

  arena
    .fullChannel("avivasilverman-com")
    .then(data => res.render("index", data))
    .catch(e => {
      console.log("error", e);
      next(e);
    });
});

module.exports = router;
