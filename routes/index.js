var express = require('express');
var router = express.Router();
var userModule = require('../modules/userModule');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ERS-Home' });
});

router.post('/api/user', function (req, res, next) {
  userModule.createUser(req.body, function (err, result) {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result);
    }
  });
});

/*
router.get('/api/users', function (reg, res, next) {
  userModule.findAllUsers(function (err, docs) {
    res.send(docs);
  });
});
*/
/*
router.delete('/v1/charts', function (reg, res, next) {
  chartModule.clearCollection(function (err, result) {
    res.status(204).send('No Content');
  });
});
router.delete('/v1/charts/:id', function (req, res, next) {
  let id = req.params.id;

  chartModule.remove(id, function (err, result) {
    console.log("Delete one chart,Result is:" + result);
    res.send(result);
  });
});*/

module.exports = router;
