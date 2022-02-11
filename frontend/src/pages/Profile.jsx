import './styles/Profile.scss';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

// react router //
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// components //
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileBio from '../components/UserProfileBio';
import UserProjects from '../components/UserProjects';
import UserApplications from '../components/UserApplications';
import SavedPostings from '../components/SavedJobsGigs';

// context //
import { UserContext } from '../Providers/userProvider';

// mui //
import {
	Grid,
	Button,
	Modal,
	Dialog,
	Box,
	Paper,
	Card,
	CardActionArea,
	CardActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	back_btn: {
		color: '#182c5b',
		background: '#E0EEFE',
		'border-color': '#182c5b',
	},
});

export default function Profile() {
	const {
		currentUser,
		profileView,
		setProfileView,
		projectForm,
		setProjectForm,
	} = useContext(UserContext);
	const { state } = useLocation();
	const [goBack, setGoBack] = useState(state);
	const navigate = useNavigate();
	const classes = useStyles();

	const [profile, setProfile] = useState({
		dev: {},
		projects: [],
	});
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState();

	const handleView = () => {
		if (openModal === true) {
			setOpenModal(false);
			cancelProjectEdit(); //clears the project form
		} else {
			setOpenModal(true);
		}
	};

	const cancelProjectEdit = () => {
		console.log('cancel');
		setProjectForm(prev => ({
			...prev,
			junior_dev_id: currentUser.id,
			project_id: '',
			title: 'New Project',
			description: '',
			thumbnail_photo_url: '',
			github_link: '',
			live_link: '',
			original_request: '',
			edit: false,
		}));
	};

	const { first_name, last_name, id } = currentUser;

	const location = useLocation();

	const { dev_id } = useParams();

	useEffect(() => {
		if (dev_id === id) {
			const devUrl = '/api/devs/' + id;
			const projectsByDevUrl = '/api/devs/' + id + '/projects';
			Promise.all([axios.get(devUrl), axios.get(projectsByDevUrl)]).then(
				all => {
					const [devData, projectsByDevData] = all;
					setProfile(prev => ({
						...prev,
						dev: devData.data,
						projects: projectsByDevData.data,
					}));
				}
			);
		} else if (dev_id !== id) {
			const devUrl = '/api/devs/' + dev_id;
			const projectsByDevUrl = '/api/devs/' + dev_id + '/projects';
			Promise.all([axios.get(devUrl), axios.get(projectsByDevUrl)]).then(
				all => {
					const [devData, projectsByDevData] = all;
					setProfile(prev => ({
						...prev,
						dev: devData.data,
						projects: projectsByDevData.data,
					}));
				}
			);
		}
	}, [currentUser, openModal, location, projectForm.edit]);

	const userProjects = (
		<UserProjects
			profile={profile}
			setProfile={setProfile}
			openModal={openModal}
			setOpenModal={setOpenModal}
			modalData={modalData}
			setModalData={setModalData}
			handleView={handleView}
			projects={profile.projects}
			dev_id={dev_id}
		/>
	);

	if (dev_id != id) {
		setProfileView('projects');
	}

	const userApplications = (
		<UserApplications
			projectForm={projectForm}
			setProjectForm={setProjectForm}
			setModalData={setModalData}
			openModal={openModal}
			setOpenModal={setOpenModal}
		/>
	);

	const savedPostings = <SavedPostings />;

	return (
		<>
			<div>
				{goBack && (
					<div id='profile-back-btn'>
						{' '}
						<Button
							variant='outlined'
							color='primary'
							onClick={() => navigate(-1)}
							className={classes.back_btn}
						>
							Back to Posting
						</Button>
					</div>
				)}
				<UserProfileHeader
					setModalData={setModalData}
					openModal={openModal}
					setOpenModal={setOpenModal}
					profileView={profileView}
					setProfileView={setProfileView}
					profile={profile}
					setProfile={setProfile}
					dev_id={dev_id}
				/>
			</div>
			<div className='profile-content page-container'>
				<UserProfileBio dev_id={dev_id} user={profile.dev} />
				{profile.projects.length === 0 && <h1>No projects added</h1>}
				<section className='profile-cards'>
					<Grid container>
						{profileView === 'projects' && userProjects}
						{profileView === 'applications' && userApplications}
						{profileView === 'saved' && savedPostings}
					</Grid>
				</section>
			</div>
			<div id='portfolio-dialog'>
				<Dialog
					open={openModal}
					onClose={handleView}
					fullWidth={true}
					maxWidth={'md'}
					scroll='body'
					sx={{
						'& .MuiDialog-paper': {
							borderRadius: '13px',
							padding: '2rem',
							color: '#fff',
							backgroundColor: '#223d55',
						},
						h1: { mt: 0 },
						p: { fontSize: '20pt' },
						'& .MuiCardHeader-subheader': {
							color: '#fff',
							fontSize: '16pt',
						},
						'& .MuiCardHeader-title': {
							fontSize: '32pt',
							fontWeight: 700,
						},
					}}
				>
					{modalData}
				</Dialog>
			</div>
		</>
	);
}
