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

import UserContext from "../../context/userContext";
import { login } from '../../connections/dataBaseService';
import EmailField from '../form/EmailField';
import PasswordField from '../form/PasswordField';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserData } = useContext(UserContext);

  const validateForm = () => {
    let invalidReasons = [];
    if (password.length < 8) {
      invalidReasons.push('Password must be at least 8 characters long.')
    }      
    return { valid: invalidReasons.length === 0, invalidReasons };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (formIsValid.valid) {
      let loginResponse;
      try {
        loginResponse = await login(email, password);
        if (loginResponse) {
          setUserData({
            isAuthed: true,
            user: loginResponse.data.user,
          });
          
        }
        localStorage.setItem("auth-token", loginResponse.data.token);
          history.push('/home');
          alert('Logged in')
      } catch (error) {
        console.error(error);
      }
      if (!loginResponse) {
        console.log('FAIL');
        setUserData({
          isAuthed: false,
          user: undefined,
        });
        alert('Not logged in!!');
      }
    } else {
      alert(`${formIsValid.invalidReasons.join(' ')}`)
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
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <EmailField value={email} onChange={setEmail} />
                </Grid>
                <Grid item>
                  <PasswordField value={password} onChange={setPassword} label="Password" />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Don't have an account?
                  </Typography>
                  <Typography variant="body1">
                    <Link href="/register">Register here</Link>
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
