var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login/signup page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/user', function(req, res, next) {
  console.log(req.body);
  res.status('200');
});

router.get('/updateprofile', function(req, res, next) {
  res.render('updateprofile');
});

router.get('/photos', function(req, res, next) {
  res.render('photos');
});

module.exports = router;
