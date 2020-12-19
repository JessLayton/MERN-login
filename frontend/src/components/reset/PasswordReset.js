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
import PasswordField from '../register/PasswordRegField';
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

const PasswordReset = () => {
  const classes = useStyles();
  const history = useHistory();

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { setUserData } = useContext(UserContext);

  const validate = () => {
    let valid = true;
    if (password.length < 8 || password !== confirmPassword) {
      valid = false;
    }       
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    let isValid = validate();   
    if (isValid) {
      let resetResponse;
     
    } else {
        SnackbarStore.showError('Failed to reset password'); 
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
                    Reset Password
                  </Typography>
                </Grid>                
                <Grid item>
                  <PasswordField 
                    value={password} 
                    onBlur={setPassword} 
                    label="Password"
                    validate={true}
                  />
                </Grid>
                <Grid item>
                  <PasswordField
                    value={confirmPassword}
                    onBlur={setConfirmPassword}
                    label="Confirm Password"
                    validate={true}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item>                  
                  <Typography variant="body1">
                    <Link href="/login">Return to login</Link>
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

export default PasswordReset;
