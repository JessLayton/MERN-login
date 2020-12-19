import React from 'react';
import { useHistory } from 'react-router-dom';

import EmailField from './EmailField';
import SnackbarStore from '../snackbar/SnackbarStore';

import { sendResetEmail } from '../../connections/dataBaseService';

import {
    Card,
    Grid,
    makeStyles,
    Typography,
    Button,
    Link,
  } from '@material-ui/core';

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
  
const Reset = () => {
    const history = useHistory();
    const classes = useStyles();
    
    const [email, setEmail] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        let emailResponse;
        try {
            emailResponse = await sendResetEmail(email);
            if (emailResponse) {
                history.push("/login");
            }
        } catch(err) {
            console.error(err);
            SnackbarStore.showError('Failed to register'); 
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
                    <Typography variant="h6" component="h1">
                      Reset password
                    </Typography>
                    <Typography variant="body1">
                      It happens to the best of us...
                    </Typography>
                  </Grid>
                  <Grid item>
                    <EmailField value={email} onBlur={setEmail} />
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
    )
}

export default Reset;