var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StockCompete' });
});

router.get('/platform', function(req, res, next){
  res.render('platform', { title: 'StockCompete | Platform' })
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

router.get('/leaderboard', function(req, res, next){
  res.render('leaderboard', { title: 'StockCompete | Leaderboard' })
});

router.get('/about', function(req, res, next){
  res.render('about', { title: 'StockCompete | About' })
});

router.get('/account/dashboard', function(req, res, next){
  res.render('accountDashboard', { title: 'StockCompete | Dashboard' })
});

router.get('/account/details', function(req, res, next){
  res.render('accountDetails', { title: 'StockCompete | Details' })
});

router.get('/account/transactions', function(req, res, next){
  res.render('accountTransactions', { title: 'StockCompete | Transactions' })
});

module.exports = router;
