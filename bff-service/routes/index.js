var express = require('express');
var router = express.Router();

/* GET initial request. */
router.get('/', function(req, res) {
    res.send('All work!');
});

module.exports = router;
