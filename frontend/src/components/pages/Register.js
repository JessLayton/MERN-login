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

import UserContext from "../../context/userContext";
import { register, login } from '../../connections/dataBaseService';
import EmailField from '../form/EmailField';
import PasswordField from '../form/PasswordField';
import UsernameField from '../form/UsernameField';
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
      if (registerResponse) {
        let loginResponse;
    try {
      loginResponse = await login(email, password);
      if (loginResponse) {
        setUserData({
          isAuthed: true,
          user: loginResponse.data.user
          });
          localStorage.setItem("auth-token", loginResponse.data.token);
        history.push('/home');
        alert('Logged in')
      }
    } catch (error) {
      console.error(error);
    }
    if (!loginResponse) {
      SnackbarStore.showError('Failed to login'); 
    }
      }
    } catch (error) {
      console.error(error);
    }
    if (!registerResponse) {
      alert('Please fill in all fields correctly');
    }
 
  };

  return (
    <Grid container item justify="center" alignItems="center">
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <Grid container align="center" className={classes.form}>
            <Grid container item justify="center" alignItems="center">
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography variant="h3" component="h1">
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <EmailField value={email} onBlur={setEmail} />
                </Grid>
                <Grid item>
                  <UsernameField value={username} onBlur={setUsername}/>                
                </Grid>
                <Grid item>
                  <PasswordField 
                    value={password} 
                    onBlur={setPassword} 
                    label="Password"
                  />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={password}
                    onBlur={setConfirmPassword}
                    label="Confirm Password"
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Already have an account?{' '}
                  </Typography>
                  <Typography variant="body1">
                    <Link href="/login">Login here</Link>
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
