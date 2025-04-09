const mongoose = require('mongoose');
const validator = require('validator');

const RequestSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: validator.isMobilePhone,
			message: 'Невалидный номер телефона',
		},
	},
	createdAt: {
		type: String,
		default: Date.now,
	},
	description: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('Request', RequestSchema);
