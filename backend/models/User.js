const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Невалидный email адрес',
		},
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
