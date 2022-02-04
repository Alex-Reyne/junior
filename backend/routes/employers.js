const express = require('express');
const router = express.Router();

module.exports = ({
	getEmployers,
	getEmployerById,
	getJobPostingsByEmployerId,
	getGigPostingsByEmployerId,
	getAllJobApplicationsForEmployer,
	getAllGigApplicationsForEmployer,
	editEmployerProfile,
	getUserByEmail,
	employerSignup,
}) => {
	/* GET all employers */
	router.get('/', (req, res) => {
		getEmployers()
			.then(employers => res.json(employers))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* GET single employer by id */
	router.get('/:id', (req, res) => {
		getEmployerById(req.params.id)
			.then(employer => res.json(employer))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/job_postings', (req, res) => {
		getJobPostingsByEmployerId(req.params.id)
			.then(postings => res.json(postings))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/gig_postings', (req, res) => {
		getGigPostingsByEmployerId(req.params.id)
			.then(postings => res.json(postings))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/job/applications', (req, res) => {
		getAllJobApplicationsForEmployer(req.params.id)
			.then(postings => res.json(postings))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	router.get('/:id/gig/applications', (req, res) => {
		getAllGigApplicationsForEmployer(req.params.id)
			.then(postings => res.json(postings))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	//Update user profile 3001/api/employers/edit
	router.post('/edit', (req, res) => {
		editEmployerProfile(req.body)
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
					employerSignup(req.body)
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
