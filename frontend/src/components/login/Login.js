import React, { useState, useContext } from 'react';
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
import { login } from '../../connections/dataBaseService';
import UsernameField from './UsernameLoginField';
import PasswordField from './PasswordLoginField';
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let loginResponse;
    try {
      loginResponse = await login(username, password);
      if (loginResponse && loginResponse.data) {
        setUserData({
          isAuthed: true,
          user: loginResponse.data.user,
        });
        localStorage.setItem('auth-token', loginResponse.data.token);
        history.push('/');
      } else {
        setUserData({
          isAuthed: false,
          user: undefined,
        });
        SnackbarStore.showError('Incorrect username or password');
      }
    } catch (error) {
      SnackbarStore.showError('Failed to login');
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
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <UsernameField value={username} onValueChange={setUsername} />
                </Grid>
                <Grid item>
                  <PasswordField value={password} onValueChange={setPassword} label='Password' validate={false} />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Don&apos;t have an account?
                  </Typography>
                  <Typography variant='body1'>
                    <Link href='/register'>Register here</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Forgotten username or password?
                  </Typography>
                  <Typography variant='body1'>
                    <Link href='/reset'>Reset here</Link>
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

export default Login;
