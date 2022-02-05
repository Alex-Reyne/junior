import './styles/PortfolioCard.scss';
import { Button, CardActions, CardContent, CardMedia } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function Profile(props) {
	const {
		title,
		description,
		thumbnail_photo_url,
		github_link,
		live_link,
		project_id,
		setOpenModal,
	} = props;
	console.log(project_id);

	const [deleteWarning, setDeleteWarning] = useState(false);

	const imgUrl =
		'https://cdn.dribbble.com/users/409537/screenshots/14290034/media/965f91e1549a177acd63b8dced7592fa.png?compress=1&resize=1200x900&vertical=top';

	const deleteProject = () => {
		axios
			.post(`/api/projects/delete/${project_id}`)
			.then(res => {
				setOpenModal(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<>
			<h1>{title ? title : 'Untitled Project'}</h1>
			<CardMedia
				component='img'
				image={thumbnail_photo_url ? thumbnail_photo_url : imgUrl}
				alt={title ? title : 'Untitled Project'}
			/>
			<p className='description'>
				{description ? description : 'No description'}
			</p>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<Button
					variant='contained'
					color='primary'
					className='modal-button'
					onClick={() =>
						github_link ? window.open(github_link, '_self') : null
					}
					disabled={!github_link}
				>
					Github
				</Button>
				<Button
					variant='contained'
					color='primary'
					className='modal-button'
					onClick={() => (live_link ? window.open(live_link, '_self') : null)}
					disabled={!live_link}
				>
					Live Link
				</Button>
				{deleteWarning && (
					<>
						<div className='delete-warning'>
							<p>are you sure?</p>
							<div>
								<Button
									variant='outlined'
									color='primary'
									className='modal-button'
									onClick={deleteProject}
								>
									Yes
								</Button>
								<Button
									variant='outlined'
									color='primary'
									className='modal-button'
									onClick={e => setDeleteWarning(false)}
								>
									No
								</Button>
							</div>
						</div>
					</>
				)}
				{!deleteWarning && (
					<>
						<Button
							variant='outlined'
							color='primary'
							className='modal-button'
							onClick={e => setDeleteWarning(true)}
						>
							Delete
						</Button>
					</>
				)}
			</CardActions>
		</>
	);
}
