import './styles/UserProjects.scss';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';
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
	CardHeader,
	IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioModal from '../components/PortfolioModal';
import PortfolioCardMenu from '../components/PortfolioCardMenu';
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileBio from '../components/UserProfileBio';
import NewProjectPost from '../components/NewProjectPost';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function UserProjects(props) {
	const {
		profile,
		setProfile,
		modalData,
		setModalData,
		openModal,
		setOpenModal,
		projects,
		dev_id,
	} = props;
	
	const {
		currentUser,
		profileView,
		setProfileView,
		projectForm,
		setProjectForm,
	} = useContext(UserContext);

	const handleView = () => {
		openModal === true ? setOpenModal(false) : setOpenModal(true);
	};

	const { first_name, last_name, id } = currentUser;

	const projectsArray = projects;
	// const parsedProjects = 'Test';
	const parsedProjects = projectsArray.map(project => {
		const data = (
			<PortfolioModal
				key={'Project-modal-' + project.project_id}
				{...project}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
		);

		return (
			<Grid
				item
				xs={1}
				sm={6}
				md={4}
				lg={3}
				key={'Project-grid-' + project.project_id}
			>
				<Grid
					container
					direction='column'
					key={'Project-grid-container-' + project.project_id}
				>
					<Card key={'Project-card-' + project.project_id} className='project-card'>
					{currentUser.id == dev_id &&
						<CardHeader
							titleTypographyProps={{fontFamily: 'Assistant', fontWeight: '700'}}
							title={project.title ? project.title : 'Untitled Project'}
							action={
								<PortfolioCardMenu
									setModalData={setModalData}
									openModal={openModal}
									setOpenModal={setOpenModal}
									setProfileView={setProfileView}
									profileView={profileView}
									{...project}
								/>	
							}
						/>
					}
						<CardActionArea
							key={'Job-card-action' + project.project_id}
							onClick={() => {
								setModalData(data);
								handleView();
							}}
						>

						{currentUser.id != dev_id &&
							<CardHeader
							titleTypographyProps={{fontFamily: 'Assistant', fontWeight: '700'}}
							title={project.title ? project.title : 'Untitled Project'}
							/>
						}
							<PortfolioCard
								key={'Portfolio-card-' + project.project_id}
								{...project}
								dev_id={dev_id}
							/>
						</CardActionArea>
						<CardActions key={'Job-card-actions-' + project.project_id}>
							<Button
								variant='contained'
								color='primary'
								key={'Job-button-github-' + project.project_id}
								onClick={() =>
									project.github_link
										? window.open(project.github_link, '_self')
										: null
								}
								disabled={!project.github_link}
							>
								Github
							</Button>
							<Button
								variant='contained'
								color='primary'
								key={'Job-button-live-' + project.project_id}
								onClick={() =>
									project.live_link
										? window.open(project.live_link, '_self')
										: null
								}
								disabled={!project.live_link}
							>
								Live Link
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		);
	});

	return parsedProjects;
}
