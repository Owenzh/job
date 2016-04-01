var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('job', { title: 'YYYYYYY' });
});

/* GET home page. */
router.get('/design', function(req, res, next) {
  res.render('design', { title: 'design' });
});

module.exports = router;
