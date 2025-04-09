const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');
const { addRequest, getRequests } = require('./controllers/requests.controller');
const User = require('./models/User');
const auth = require('./middlewares/auth');

const port = 3100;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.post('/api/requests', async (req, res) => {
	try {
		if (req.body.fullName === '') return res.status(400).json({ message: 'Поле "ФИО" должно быть заполнено' });
		if (req.body.phone === '')
			return res.status(400).json({ message: 'Поле "Номер телефона" должно быть заполнено' });

		const savedRequest = await addRequest(req.body);
		res.json(savedRequest);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
		if (password !== user.password) return res.status(400).json({ message: 'Пароль неверный' });

		const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
		res.cookie('token', token, { httpOnly: true });
		res.json({ token });
	} catch (e) {
		console.log(e);
	}
});

app.get('/api/verify', (req, res) => {
	if (!req.cookies.token) {
		return res.status(401).end();
	}
});
app.post('/api/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true });
	res.status(200).json({ success: true });
});

app.use(auth);

app.get('/api/requests', async (req, res) => {
	try {
		const requests = await getRequests();
		res.json(requests);
	} catch (e) {
		res.static(500).json({ error: e.message });
	}
});

mongoose.connect('mongodb://user:mongopass@localhost:27017/requests?authSource=admin').then(() => {
	app.listen(port, () => {
		console.log(`Server has been started on port ${port}...`);
	});
});
