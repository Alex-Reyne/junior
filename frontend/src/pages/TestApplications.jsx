import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './styles/TestApplications.scss';

export default function ApplicationsTest(props) {
	const { currentUser } = props;
	const [accepted, setAccepted] = useState('');

	// const { id } = currentUser;

	const id = 2;

	useEffect(() => {
		const getApplications = () => {
			axios
				.post(`/api/job_applications/accept/${id}`, {
					params: {
						id: id,
					},
				})
				.then(res => {
					console.log(res.data);
					setAccepted(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		};

		getApplications();
	}, []);

	// const showApps = accepted.map(item => {
	// 	return <h1>{item}</h1>;
	// });

	return (
		<div id='test-apps'>
			<h1>Applications:</h1>
			<h2>{currentUser.id}</h2>
			<h2>{accepted.id}</h2>
		</div>
	);
}