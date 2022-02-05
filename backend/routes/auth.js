const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');

module.exports = ({ getUserByEmail }) => {
	// get email and password from form
	// retrieve dev by email -with email and pw
	// authenticate if the password matches the pw then log them in
	router.post('/login', (req, res) => {
		const { email: submittedEmail, password: submittedPassword } = req.body;
		getUserByEmail(submittedEmail)
			.then(dev => {
				// authenticate
				if (submittedPassword.length <= 3) {
					if (dev.password === submittedPassword) {
						req.session.user = dev;
						res.json(dev);
					} else {
						res.json(false);
					}
				} else {
					if (bcrypt.compareSync(submittedPassword, dev.password)) {
						res.cookie('email', dev.email);
						res.json(dev);
					} else {
						res.json(false);
					}
				}
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.post('/check', (req, res) => {
		// get email from cookie
		const email = req.session.user.email;

		getUserByEmail(email)
			.then(dev => {
				res.json(dev);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.post('/logout', (req, res) => {
		req.session.destroy();
		res.send({});
	});

	return router;
};
