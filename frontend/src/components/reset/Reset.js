import React from 'react';

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
    const classes = useStyles();
    
    const [resetEmailSent, setResetEmailSent] = React.useState(false);
    const [email, setEmail] = React.useState('');

const sendEmail = async () => {
  let emailResponse;
  try {
      emailResponse = await sendResetEmail(email);
      if (emailResponse) {
          setResetEmailSent(true);
          SnackbarStore.showSuccess('Email sent'); 
      }
  } catch(err) {
      console.error(err);
      SnackbarStore.showError('Failed to send'); 
  }
}

    const handleSubmit = async (event) => {
        event.preventDefault();
        sendEmail();
      };

      const handleClick = () => {
        sendEmail();   
      }

    return (
        <Grid container item justify="center" alignItems="center">
        <Card className={classes.card}>
          {!resetEmailSent
          ? (
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
          )
          : (
            <Grid container align="center" className={classes.content}>
            <Grid container item justify="center" alignItems="center">
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography variant="h6" component="h1">
                    An email has been sent to reset your password
                  </Typography>                   
                </Grid>                       
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleClick}>
                    Resend email
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
          )          
          
          }
       
        </Card>
      </Grid>
    )
}

export default Reset;