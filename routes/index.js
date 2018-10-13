const emailServer = require('../config/emailConfig');
const express = require('express');
const router = express.Router();


let states = require('../process/data/states.json');
let cities = require('../process/data/cities.json');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Colégio CEC :: Home'
	});
});

/* GET contact page. */
router.get('/contatos', function (req, res, next) {
	res.render('contacts', {
		title: 'Colégio CEC :: Contatos',
		layout: 'pages'
	});
});

router.get('/states', function (req, res, next) {
	res.send(states);
});

router.get('/cities', function (req, res, next) {
	let results = [];
	let stateCities = cities.filter((item) => item.state.toLowerCase().startsWith(req.query.state.toLowerCase()));
	results = stateCities.filter((item) => item.text.toLowerCase().startsWith(req.query.q.term.toLowerCase()));
	res.send(results);
});

router.get('/citiesByState', function (req, res, next) {
	let results = [];
	if (req.query.state) {
		let search = req.query.q.term;
		results = cities.filter((item) => item.state.startsWith(search));
	}
	res.send(results);
});

router.post('/sendStudentInfo', function (req, res, next) {
	try {
		if (!req.body) throw new Error("Input not valid");
		let data = req.body;
		if (data) {
			let emailText = `Caro(a) responsavel, veja abaixo as informações de uma matrícula. \n\n `;

			let veteran = (data.veteran ? 'Veterano(a)' : 'Novato(a)');
			emailText += `${veteran} \n
						 Aluno: ${data.studentName} \n
						 Matrícula: ${data.studentCode} \n
						 Data de Nascimento: ${data.studentBirthDate} \n
						 Naturalidade: ${data.studentBirthTown} \n						 
						 Endereço: ${data.studentAddress} \n
						 Bairro: ${data.studentDistrict} \n
						 Cidade: ${data.studentCity} \n
						 Estado: ${data.studntState} \n
						 CEP: ${data.studentZipCode} \n
						 Estado: ${data.studentState} \n
						 Cidade: ${data.studentCity} \n
						 Cert. de nasci. Termo: ${data.studentBirthRegisterTerm} \n
						 Folha: ${data.studentBirthRegisterSheet} \n
						 Livro: ${data.studentBirthRegisterBook} \n
						 Dt. do Registro: ${data.studentBirthRegisterDate} \n
						 Nome do cartório: ${data.studentBirthRegisterPlaceName} \n
						 Ensino: ${data.studentBirthTown} \n
						 Aluno: ${data.curriculum} \n
						 Turma: ${data.studentGroup} \n
						 Turno: ${data.studentShift} \n
						 Telefone Residênial: ${data.studentPhone} \n
						 Telefone Celular: ${data.studentCelPhone} \n\n
						 Nome do Pai: ${data.fatherName} \n
						 Profissão: ${data.fatherProfission} \n
						 RG: ${data.fatherIdentity} \n
						 CPF: ${data.fatherSSN} \n
						 Dt. Nascimento: ${data.fatherBDate} \n
						 Email: ${data.fatherEmail} \n
						 End. Residêncial: ${data.fatherAddress} \n
						 Bairro: ${data.fatherDistrict} \n
						 Cidade: ${data.fatherCity} \n
						 Estado: ${data.fatherState} \n
						 CEP: ${data.fatherZipCode} \n
						 Tel. Residêncial: ${data.fatherPhone} \n
						 Tel. comercial: ${data.fatherComPhone} \n
						 Celular: ${data.fatherCelPhone} \n\n
						 Nome da Mãe: ${data.motherName} \n
						 Profissão: ${data.motherProfission} \n
						 RG: ${data.motherIdentity} \n
						 CPF: ${data.motherSSN} \n
						 Dt. Nascimento: ${data.motherBDate} \n
						 Email: ${data.motherEmail} \n
						 End. Residêncial: ${data.motherAddress} \n
						 Bairro: ${data.motherDistrict} \n
						 Cidade: ${data.motherCity} \n
						 Estado: ${data.motherState} \n
						 CEP: ${data.motherZipCode} \n
						 Tel. Residêncial: ${data.motherPhone} \n
						 Tel. comercial: ${data.mnotherComPhone} \n
						 Celular: ${data.motherCelPhone} \n\n\n`;

			emailText += 'Obrigado! \n\n';

			// send the message and get a callback with an error or details of the message that was sent 
			emailServer.send({
				text: emailText.toUpperCase(),
				from: "Administrador - CCEC <contato@riw.com.br>",
				to: '"Responsável" <contato@riw.com.br>',
				subject: 'Nova matrícula'
			}, function (emailErr, message) {
				if (emailErr) {
					res.json({
						error: emailErr
					});
				} else {
					res.json({
						success: "success"
					});
				}
			});
		}
	} catch (ex) {
		res.send(ex);
	};
});

/* GET register page. */
router.get('/matricula', function (req, res, next) {
	res.render('register', {
		title: 'Colégio CEC :: Matrícula',
		layout: 'pages',
		css: [
			'/lib/select2/css/select2.min.css',
			'/lib/sweetalert2/css/sweetalert2.min.css'
		],
		script: [
			'/lib/kendo/js/kendo.web.min.js',
			'/lib/kendo/js/cultures/kendo.culture.pt-BR.min.js',
			'/lib/kendo/js/messages/kendo.messages.pt-BR.min.js',
			'/lib/select2/js/select2.full.min.js',
			'/lib/select2/i18n/pt-BR.js',
			'/lib/sweetalert2/js/sweetalert2.min.js',
			'/lib/moment/moment.min.js',
			'/js/register.js'
		]
	});
});

module.exports = router;