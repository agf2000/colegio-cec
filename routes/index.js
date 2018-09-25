var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Colégio CEC :: Home'
	});
});

/* GET home page. */
router.get('/contatos', function (req, res, next) {
	res.render('contacts', {
		title: 'Colégio CEC :: Contatos',
		layout: 'pages'
	});
});

module.exports = router;