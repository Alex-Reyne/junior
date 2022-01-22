module.exports = db => {
	/* GET an accpeted gig application by junior_dev_id */
	const getAcceptedGigs = junior_dev_id => {
		const query = {
			text: `SELECT * FROM accepted_gigs
      WHERE junior_dev_id = $1`,
			values: [junior_dev_id],
		};
	};

	/* complete an accepted gig by id */

	const completeAcceptedGig = id => {
		const query = {
			text: `UPDATE accepted_gigs
      SET is_completed = true
      WHERE id = $1`,
			values: [id],
		};
	};

	/* POST a new accepted gig to database */
	const addAcceptedGig = (gig_id, junior_dev_id, employer_id, is_completed) => {
		const query = {
			text: `INSERT INTO accepted_gigs (
        gig_id,
        junior_dev_id,
        employer_id,
        is_completed,
        ) VALUES (
          $1, $2, $3, $4
        ) RETURNING *`,
			values: [gig_id, junior_dev_id, employer_id, is_completed],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	return { addAcceptedGig, completeAcceptedGig, getAcceptedGigs };
};
