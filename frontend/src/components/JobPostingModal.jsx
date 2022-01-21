import './styles/PortfolioCard.scss';
import {CardContent, CardMedia} from '@mui/material';

export default function Posting(props) {
  const {
    job_title,
    description,
    city,
    salary,
    formatted_salary,
    job_type,
    is_remote,
    date_posted,
    formatted_date,
    is_open,
    pay,
    formatted_pay,
    deadline,
    formatted_deadline,
    photo_url
  } = props;

  return (
    <CardContent>
      <h1>{job_title}</h1>
      {pay && <p><strong>Compensation:</strong> ${pay / 100.00}</p>}
      {photo_url && <CardMedia
				component="img"
				image={photo_url}
				alt={job_title}
			/>}
      {city && <p> {city}, Canada ({is_remote ? 'Remote' : 'On-site'})</p>}
      {salary && <p><strong>Salary:</strong> ${formatted_salary} ({job_type})</p>}
      <p><strong>Date Posted:</strong> {formatted_date}</p>
      {is_open && <p><strong>Accepting Applicants:</strong> {is_open ? 'Yes' : 'No'}</p>}
			{deadline && <p><strong>Deadline:</strong> {formatted_deadline}</p>}
      <p className="description">{description}</p>
    </CardContent>
  );
}
