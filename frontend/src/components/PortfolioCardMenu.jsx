import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './styles/ProfileMenu.scss';
import { useNavigate } from 'react-router-dom';

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
		original_request
	} = props;

	// console.log(props.project);

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

	const newProjectModal = (
		<NewProjectPost
		setOpenModal={setOpenModal}
		projectForm={projectForm}
		setProjectForm={setProjectForm}
		/>
	);
	const editProject = () => {
		setProjectForm(prev => ({
			...prev,
			title,
			description,
			thumbnail_photo_url,
			github_link,
			live_link,
			original_request
		}));
		console.log('Edit');
	};
		
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
							console.log('Delete');
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
