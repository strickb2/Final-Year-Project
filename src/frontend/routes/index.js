var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StockCompete' });
});

router.get('/login', function(req, res, next){
  res.render('login', { title: 'StockCompete | Login' })
});

router.get('/stock', function(req, res, next){
  res.render('stock', { title: 'StockCompete | Stock' })
});

router.get('/signup', function(req, res, next){
  res.render('signup', { title: 'StockCompete | Sign Up' })
});

router.get('/account/dashboard', function(req, res, next){
  res.render('accountDashboard', { title: 'StockCompete | Account Dashboard' })
});

router.get('/account/details', function(req, res, next){
  res.render('accountDetails', { title: 'StockCompete | Account Details' })
});

router.get('/account/transactions', function(req, res, next){
  res.render('accountTransactions', { title: 'StockCompete | Account Transactions' })
});

module.exports = router;
