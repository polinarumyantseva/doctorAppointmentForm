const Request = require('../models/Request');

async function addRequest({ fullName, phone, description }) {
	const newRequest = await Request.create({
		fullName,
		phone,
		description,
		createdAt: new Date(),
	});
	return newRequest;
}

async function getRequests() {
	const requests = await Request.find().sort({ createdAt: -1 });

	return requests;
}

module.exports = {
	addRequest,
	getRequests,
};
