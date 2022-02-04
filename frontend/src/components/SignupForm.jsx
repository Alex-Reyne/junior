import './styles/SignupForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';

export default function SignupForm(props) {
	const { handleSignupView, handleLoginView } = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [matchPass, setMatchPass] = useState(true);
	const [shortPass, setShortPass] = useState(true);
	const [emailInUse, setEmailInUse] = useState(false);
	const [userType, setUserType] = useState('developer');

	const navigate = useNavigate();

	const signup = e => {
		e.preventDefault();

		setMatchPass(true);
		setShortPass(true);

		if (
			document.getElementById('password').value !==
			document.getElementById('confirm-password').value
		) {
			setMatchPass(false);
			return;
		}

		if (document.getElementById('password').value.length < 8) {
			setShortPass(false);
			return;
		}

		const loginData = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		if (userType === 'developer') {
			const devSignupData = {
				first_name: document.getElementById('first_name').value,
				last_name: document.getElementById('last_name').value,
				email: document.getElementById('email').value,
				password: document.getElementById('password').value,
			};

			axios
				.post('/api/devs/signup', devSignupData)
				.then(res => {
					console.log('FRONTEND EMAIL CHECK', res);
					if (res.data) {
						setEmailInUse(true);
						throw console.error('email already in use');
					}
				})
				.then(res => {
					axios.post('/api/auth/login', loginData).then(res => {
						setCurrentUser(res.data);
						console.log('RES FROM LOGIN', res.data);
						setMatchPass(false);
						setEmailInUse(false);
					});
				})
				.catch(err => {
					console.log(err);
				});
		}

		if (userType === 'employer') {
			const employerSignupData = {
				company_name: document.getElementById('company_name').value,
				email: document.getElementById('email').value,
				password: document.getElementById('password').value,
			};

			axios
				.post('/api/employers/signup', employerSignupData)
				.then(res => {
					console.log('FRONTEND EMAIL CHECK', res);
					if (res.data) {
						setEmailInUse(true);
						throw console.error('email already in use');
					}
				})
				.then(res => {
					axios.post('/api/auth/login', loginData).then(res => {
						setCurrentUser(res.data);
						console.log('RES FROM LOGIN', res.data);
						setMatchPass(false);
						setEmailInUse(false);
					});
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (currentUser.company_name) {
			navigate(`/employer/${currentUser.id}`);
		} else {
			navigate(`/dev/${currentUser.id}`);
		}
		handleSignupView();
	}, [currentUser]);

	return (
		<div>
			<div id='signup-box'>
				<form className='signup' onSubmit={signup}>
					<h1>Sign up for a new account</h1>
					{userType === 'developer' && (
						<>
							<h2>
								Sign up now to get started building your portolfio and launch
								your career
							</h2>
							<a
								className='switch-signup'
								onClick={e => {
									setUserType('employer');
									setMatchPass(true);
									setShortPass(true);
								}}
							>
								Sign up as an employer instead.
							</a>
							<TextField
								sx={{ mb: '1rem', ml: '10%', mr: '10%' }}
								id='first_name'
								label='First Name'
							/>
							<TextField
								sx={{ mb: '1rem', ml: '10%', mr: '10%' }}
								id='last_name'
								label='Last Name'
							/>
						</>
					)}
					{userType === 'employer' && (
						<>
							<h2>
								Sign up now to find awesome entry level and junior developers
								for hire or to work on freelance projects.
							</h2>
							<a
								className='switch-signup'
								onClick={e => {
									setUserType('developer');
									setMatchPass(true);
									setShortPass(true);
								}}
							>
								Sign up as a developer instead.
							</a>
							<TextField
								sx={{ mb: '1rem', ml: '10%', mr: '10%' }}
								id='company_name'
								label='Company Name'
							/>
						</>
					)}
					{emailInUse && <p id='email-error'>Email already in use!</p>}
					<TextField
						sx={{ mt: '0rem', ml: '10%', mr: '10%' }}
						id='email'
						type='email'
						label='Email'
					/>
					{!matchPass && <p id='password-error'>Passwords must match!</p>}
					{!shortPass && (
						<p id='password-error'>
							Passwords must be at least 8 characters long!
						</p>
					)}
					<TextField
						id='password'
						sx={{ mt: '1rem', ml: '10%', mr: '10%' }}
						label='Password'
						type='password'
						variant='outlined'
					/>
					<TextField
						id='confirm-password'
						sx={{ mt: '1rem', ml: '10%', mr: '10%' }}
						label='Confirm Password'
						type='password'
						variant='outlined'
					/>
					<Button
						sx={{ ml: '10%', mr: '10%', mt: '1rem' }}
						variant='contained'
						size='large'
						type='submit'
						onClick={null}
					>
						Sign Up
					</Button>
					<Link className='login' to='/' onClick={handleLoginView}>
						Already have an account?
					</Link>
				</form>
				<div className='signup-footer'>
					<p>© 2020 Junior. All rights reserved</p>
					<p className='tos-text'>
						<Link to='/' onClick={handleSignupView}>
							Terms of Service
						</Link>{' '}
						-{' '}
						<Link to='/' onClick={handleSignupView}>
							Privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
