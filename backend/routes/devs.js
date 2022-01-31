const express = require('express');
const router = express.Router();

module.exports = ({
	getDevs,
	getDevById,
	getUserByEmail,
	getProjectsByDevId,
	getJobApplicationsByDevId,
	getGigApplicationsByDevId,
	getAcceptedGigs,
	editProfile,
	userSignup,
}) => {
	/* GET list of all devs */
	router.get('/', (req, res) => {
		getDevs()
			.then(devs => res.json(devs))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	// return data for single dev based on id (can retrieve from cookies)
	router.get('/:id', (req, res) => {
		getDevById(req.params.id)
			.then(dev => res.json(dev))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	// get all projects for single dev, with dev info
	router.get('/:id/projects', (req, res) => {
		getProjectsByDevId(req.params.id)
			.then(projects => {
				res.json(projects);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/applications/job', (req, res) => {
		getJobApplicationsByDevId(req.params.id)
			.then(applications => {
				res.json(applications);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* GET accepted gig applications by junior_dev_id */
	router.get('/:id/accepted/gig', (req, res) => {
		getAcceptedGigs(req.params.id)
			.then(gig => res.json(gig))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/applications/gig', (req, res) => {
		getGigApplicationsByDevId(req.params.id)
			.then(applications => {
				res.json(applications);
			})
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	//Update user profile 3001/api/devs/edit/1
	router.post('/edit', (req, res) => {
		editProfile(req.body)
			.then(profile => res.json(profile))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.post('/signup', (req, res) => {
		getUserByEmail(req.body.email)
			.then(check => {
				console.log('EMAIL CHECK', check || null);
				if (check) {
					return res.json(true);
				} else {
					userSignup(req.body)
						.then(profile => res.json(profile))
						.catch(err =>
							res.json({
								error: err.message,
							})
						);
				}
			})
			.catch(err => console.log(err));
	});

	return router;
};
