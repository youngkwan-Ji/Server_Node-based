var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/summary', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.send('respond with a resource');
});

module.exports = router;
