// DB queries for DEV PROJECTS //

module.exports = db => {
	const getProjectById = id => {
		const query = {
			text: `SELECT * FROM projects WHERE id= $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const deleteProjectById = id => {
		const query = {
			text: `DELETE FROM projects WHERE id= $1`,
			values: [id],
		};

		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const addProject = (
		junior_dev_id,
		title,
		description,
		thumbnail_photo_url,
		github_link,
		live_link
	) => {
		const query = {
			text: `INSERT INTO projects (junior_dev_id, title, description, thumbnail_photo_url, github_link, live_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			values: [
				junior_dev_id,
				title,
				description,
				thumbnail_photo_url,
				github_link,
				live_link,
			],
		};
		return db
			.query(query)
			.then(result => result.rows[0])
			.catch(err => err);
	};

	const editProject = params => {
		console.log('editProject params: ',params);
		const query = {
			text: `UPDATE projects 
				SET title = $1,
				description = $2,
				thumbnail_photo_url = $3,
				github_link = $4,
				live_link = $5
				WHERE id = $6
				RETURNING *`,
			values: [
				params.junior_dev_id,
				params.title,
				params.description,
				params.thumbnail_photo_url,
				params.github_link,
				params.live_link,
				params.id
			],
		};
		return db
			.query(query)
			.then(result => console.log(result))
			.catch(err => err);
	};
	return {
		getProjectById,
		deleteProjectById,
		addProject,
		editProject
	};
};
