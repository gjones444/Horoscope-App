var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');
var models = require('./../models');
models.sequelize.sync();

var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../client/html/index.html'));
});

router.get('/group', function(req,res){
	res.sendFile(path.join(__dirname, '../client/html/selector.html'));
});

router.get('/get-users', function(req,res){
	models.Users.findAll({}).then(function(zodiac_users){
		res.json(zodiac_users);
	});
});

router.get('/get-all-zodiacs', function(req,res){
	models.Horoscope_Tables.findAll({}).then(function(zodiac_all){
		res.json(zodiac_all);
	});
});

router.post('/create-user', function(req,res){
	if (req.body.name !== '' && req.body.bday !== '' && req.body.zodiac !== '') {
		models.Users.create({
 	 	Name: req.body.name,
 	 	Birthdate: req.body.bday,
 	 	Zodiac: req.body.zodiac
 	 });
 	 console.log(req.body)
 } else if (req.body.name === '' && req.body.bday !== '' && req.body.zodiac !== '') {
	 models.Users.create({
	 Name: "Anonymous",
	 Birthdate: req.body.bday,
	 Zodiac: req.body.zodiac
	});
} else if (req.body.name === '' && req.body.bday === '' && req.body.zodiac === '') {
	 res.json("null")
 }
 request(`http://www.astrology-zodiac-signs.com/horoscope/aries/daily/`, function(err, response, html) {
	 if (err) {
		 throw err
	 }
	 var $ = cheerio.load(html);
	 var results = [];
	 $('.single_Horoscope').each(function(index, element) {
		 // console.log(element)
		 var horoscopecontainer = $(element).find("single_Horoscope");
		 horoscopecontainer.each(function() {

		 })
			//  var tr = $(this).find("tr");
			//  tr.each(function() {
			// 	 var teamname = $(this).find("td").eq(1).text().trim();
			// 	 var ppg = $(this).find("td").eq(2).text().trim();
			// 	 if (ppg.match(/[A-Za-z]/) == null) {
			// 		 results.push({
			// 			 player: team,
			// 			 ppg: parseFloat(ppg)
			// 		 });
				 // }
			 // });
		 // });
	 });
 });
});




router.post('/create-zodiac', function(req,res){
	models.Horoscope_Tables.create({
		Zodiac: req.body.Zodiac,
		Todays_horoscope: req.body.Todays_horoscope,
		description: req.body.description,
		date_range: req.body.date_range
	});
	res.json(createUnregisteredUser);
});


router.get('/get-one-zodiac/:zodiac', function(req,res){
	models.Horoscope_Tables.findAll({where: {Zodiac: req.params.zodiac}}).then(function(zodiac_one){
		res.json(zodiac_one);
		// console.log(req.params.zodiac)
	});
});

router.get('/get-horoscope/:Zodiac', function(req,res){
	models.Horoscope_Tables.findOne({where: {Zodiac: req.params.Zodiac}}).then(function(zodiac_one){
		res.json(zodiac_one);
		console.log(req.params.Zodiac)
	});
});

router.get('/zodiac-by-users/:Zodiac', function(req,res){
	models.Users.findAll({where: {Zodiac: req.params.Zodiac}}).then(function(zodiac_by_users){
		res.json(zodiac_by_users);
		// console.log(req.params)
	});
});

router.delete('/delete-user/:id', function(req,res){
	models.Users.destroy({where: {id: req.params.id}});
})

module.exports = router;
