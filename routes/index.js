var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Colégio CEC :: Home',
		header: '/views/partials/homeHeader.hbs'
	});
});

module.exports = router;