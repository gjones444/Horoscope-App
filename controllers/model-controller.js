var models = require('./../models');

module.exports = {
	getAllUsers: (zodiac_users) => {
		models.Users.findAll({
			attributes: ['Name', 'Birthdate', 'Zodiac']
		}).then(function(res){
			zodiac_users(res)
		});
	},
	getAllZodiacs: (zodiac_all) => {
		models.Horoscope_Tables.findAll({
			attributes: ['Zodiac', 'Todays_horoscope', 'description', 'date_range']
		}).then(function(res){
			zodiac_all(res)
		});
	},
	getOneZodiac: (zodiac_one) => {
		models.Horoscope_Tables.findOne({where: {zodiac: zodiac}}).then((res) => {
			zodiac_one(res)
		});
	},
	getUsersByZodiac: (zodiac_by_users) => {
		models.Users.findAll({where: {Zodiac: Zodiac}}).then((res) => {
			zodiac_by_users(res)
		});
	},
	createUnregisteredUser: (Name, Birthdate, Zodiac) => {
		models.Users.create({
			Name: name,
			Birthdate: Birthdate,
			Zodiac: Zodiac
		}).then(function(res){
			createUnregisteredUser(res)
		});
	},
	createRegisteredUser: (create_Ruser) => {
		alert("User Already Exists")
	},
	createZodiacs: (Zodiac, Todays_horoscope, description, date_range) => {
		models.Horoscope_Tables.create({
			Zodiac: Zodiac,
			Todays_horoscope: Todays_horoscope,
			description: description,
			date_range: date_range
		}).then(function(res){
			createZodiacs(res)
		});
	},
}
