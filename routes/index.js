const express = require('express');
const router = express.Router();

const Arena = require('../lib/arena');

router.get('/', (req, res, next) => {
  const arena = new Arena;

  arena
    .fullChannel("hayleysilverman-com")
    .then(data =>
      res.render('index', data)
    );
});

module.exports = router;
