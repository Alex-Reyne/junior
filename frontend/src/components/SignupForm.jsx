import './styles/SignupForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Providers/userProvider';

export default function Login(props) {
	const { handleSignupView, handleLoginView } = props;
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const navigate = useNavigate();

	const login = e => {
		e.preventDefault();

		const data = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		axios
			.post('/api/auth/login', data)
			.then(res => {
				setCurrentUser(res.data);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
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
				<form className='signup' onSubmit={login}>
					<h1>Sign up for a new account</h1>
					<h2>
						Sign up now to get started building your portolfio and launch your
						career
					</h2>
					<TextField
						sx={{ mt: '0rem', ml: '10%', mr: '10%' }}
						id='email'
						label='Email'
					/>
					<TextField
						id='password'
						sx={{ mt: '1rem', ml: '10%', mr: '10%' }}
						label='Password'
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
					<Link className='already-signed-up' to='/' onClick={handleLoginView}>
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
