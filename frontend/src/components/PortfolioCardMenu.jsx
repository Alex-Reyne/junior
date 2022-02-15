import * as React from 'react';
import { Button, Menu, MenuItem, DialogTitle, DialogContent, DialogContentText, DialogActions, CardContent } from '@mui/material';
import './styles/ProfileMenu.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { UserContext } from '../Providers/userProvider';
import { useContext } from 'react';
import NewProjectPost from './NewProjectPost';

import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function PositionedMenu(props) {
	const { setModalData, openModal, setOpenModal } =
		props;
	const {
		currentUser,
		profileView,
		setProfileView,
		projectForm,
		setProjectForm,
	} = useContext(UserContext);

	const {
		title,
		description,
		thumbnail_photo_url,
		github_link,
		live_link,
		original_request,
		project_id,
	} = props;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};


	const editProject = () => {
		setProjectForm(prev => ({
			...prev,
			title,
			project_id,
			description,
			thumbnail_photo_url,
			github_link,
			live_link,
			original_request,
			edit: true,
		}));
	};

	const deleteProject = () => {
		axios
			.post(`/api/projects/delete/${project_id}`)
			.then(res => {
				setOpenModal(false);
			})
			.catch(err => console.log(err));
	};

	const newProjectModal = (
		<NewProjectPost
		setOpenModal={setOpenModal}
		projectForm={projectForm}
		setProjectForm={setProjectForm}
		/>
	);

	const confirmationModal = (
		<>
			<CardContent>
			{/* <DialogTitle id="alert-dialog-title"> */}
				{/* {"Use Google's location service?"} */}
			{/* </DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description"> */}
					Are you sure you want to delete {title}?
				{/* </DialogContentText>
			</DialogContent> */}
			{/* <DialogActions> */}
				<Button
					variant='contained'
					color='primary'
					onClick={deleteProject}>Delete</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={e => setOpenModal(false)} autoFocus>
					Cancel
				</Button>
			</CardContent>
			{/* </DialogActions> */}
		</>
	);
		
	return (
		<div >
				<IconButton
					onClick={handleClick}
					aria-label='settings'
				>
					<MoreVert
						fontSize='small'
						sx={{ borderRadius: 50 }}
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					/>
				</IconButton>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<div>
					<MenuItem
						onClick={e => {
							// setProfileView('projects');
							editProject();
							setModalData(newProjectModal);
							handleView();
							handleClose();
						}}
					>
						Edit
					</MenuItem>
					<MenuItem
						onClick={e => {
							setModalData(confirmationModal);
							handleView();
							handleClose();
						}}
					>
						Delete
					</MenuItem>
				</div>
			</Menu>
		</div>
	);
}
