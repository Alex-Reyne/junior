import './styles/PortfolioCard.scss';
import { CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserContext } from '../Providers/userProvider';
import { useContext } from 'react';

export default function Profile(props) {
	const { title, description, thumbnail_photo_url, github_link, live_link, dev_id } =
		props;
	const imgUrl =
		'https://cdn.dribbble.com/users/409537/screenshots/14290034/media/965f91e1549a177acd63b8dced7592fa.png?compress=1&resize=1200x900&vertical=top';
	const { currentUser } = useContext(UserContext);
	console.log(`id: ${currentUser.id} dev_id: ${dev_id}`);

	return (
		<CardContent>
			{currentUser.id != dev_id && <h1>{title ? title : 'Untitled Project'}</h1>}
			<CardMedia
				component='img'
				image={thumbnail_photo_url ? thumbnail_photo_url : imgUrl}
				alt={title ? title : 'Untitled Project'}
			/>
			<p className='description'>
				{description ? description : 'No description'}
			</p>
		</CardContent>
	);
}
