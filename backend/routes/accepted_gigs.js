module.exports = ({ getGigApplicationById, addAcceptedGig }) => {
	/* GET a accepted gig application by gig_applications.id */
	router.get('/:id', (req, res) => {
		getAcceptedGig(req.params.id)
			.then(gig => res.json(gig))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	/* POST a new accepted gig */
	router.post('/new', (req, res) => {
		const { gig_posting_id, junior_dev_id } = req.body;
		addAcceptedGig(gig_posting_id, junior_dev_id)
			.then(newGigApplication => res.json(newGigApplication))
			.catch(err =>
				res.json({
					error: err.message,
				})
			);
	});

	return router;
};
