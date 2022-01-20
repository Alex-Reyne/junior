import './styles/LandingPage.scss';
import {Link} from 'react-router-dom';
import {TextField, Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import LoginForm from '../components/LoginForm';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from '@mui/material';

const useStyles = makeStyles({
  textfield: {
    width: '100%',
    // border: 'none',
    // background: '#F9F9F9',
    // 'border-radius': '4px',
  },

  search_form: {
    background: '#F9F9F9',
    'border-radius': '4px',
    display: 'flex',
    border: '1px solid #bfbfbf',
  },

  drop_down: {
    border: 'none',
    'border-radius': '4px',
    padding: '2px',
    background: '#192c5b',
    color: '#f9f9f9',
    height: '50px',
  },

  'drop_down svg': {
    color: 'white',
  },

  search_icon: {
    cursor: 'pointer',
  },
});

export default function LandingPage(props) {
  const {loginView, handleLoginView, currentUser, setCurrentUser} = props;
  const classes = useStyles();

  const [jobType, setJobType] = useState('');

  const searchView = () => {
    return (
      <div>
        <div id="white-box">
          <div id="white-box-content">
            <h1 className="build">Build Your Portfolio.</h1>
            <h1 className="get-paid">Get Paid. Find Work.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              <br></br>
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <form className={classes.search_form}>
              <Box sx={{minWidth: 120}}>
                <FormControl fullWidth className={classes.drop_down}>
                  <Select
                    value={jobType}
                    // onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                    sx={{
                      color: 'white',
                      'font-family': 'Assistant',
                      padding: '0',
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Job Type</em>
                    </MenuItem>
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'jobs'}>Jobs</MenuItem>
                    <MenuItem value={'gigs'}>Gigs</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                id="search-bar"
                label="Find Work"
                variant="outlined"
                className={classes.textfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        className={classes.search_icon}
                        onClick={() => {
                          console.log('clicked');
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Button
							sx={{ ml: '2rem' }}
							variant='contained'
							size='large'
							href='/jobs'
						>
							SEARCH
						</Button> */}
            </form>
            <img src="images/homepage-brands.png" alt="trusted brands" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-wrapper">
      {loginView && (
        <LoginForm
          handleLoginView={handleLoginView}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {!loginView && searchView()}
    </div>
  );
}
