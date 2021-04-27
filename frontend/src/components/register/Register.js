import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Card,
  Grid,
  makeStyles,
  Typography,
  Button,
  Link,
} from '@material-ui/core';

import UserContext from '../../context/userContext';
import { register } from '../../connections/dataBaseService';
import EmailField from './EmailRegField';
import PasswordField from './PasswordRegField';
import UsernameField from './UsernameRegField';
import SnackbarStore from '../snackbar/SnackbarStore';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '20px',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  form: {
    marginTop: '20px',
    marginBottom: '30px',
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let registerResponse;
    try {
      registerResponse = await register(email, username, password, confirmPassword);
      if (registerResponse && registerResponse.data) {
        setUserData({
          isAuthed: true,
          user: registerResponse.data.user,
        });
        localStorage.setItem('auth-token', registerResponse.data.token);
        history.push('/');
      } else {
        SnackbarStore.showError('Failed to register - please fill in all fields correctly');
      }
    } catch (error) {
      SnackbarStore.showError('Failed to register');
    }
  };

  return (
    <Grid container item justify='center' alignItems='center'>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <Grid container align='center' className={classes.form}>
            <Grid container item justify='center' alignItems='center'>
              <Grid container spacing={2} direction='column'>
                <Grid item>
                  <Typography variant='h3' component='h1'>
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <EmailField value={email} onValueChange={setEmail} />
                </Grid>
                <Grid item>
                  <UsernameField value={username} onValueChange={setUsername} />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={password}
                    onValueChange={setPassword}
                    label='Password'
                    validate
                  />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    label='Confirm Password'
                    validate
                  />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Already have an account?
                    {' '}
                  </Typography>
                  <Typography variant='body1'>
                    <Link href='/login'>Login here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default Register;
