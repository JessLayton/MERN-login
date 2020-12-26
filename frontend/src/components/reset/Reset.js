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
    content: {
      marginTop: '20px',
      marginBottom: '30px',
    },
    button: {
      width: '240px'
    }
  }));
  
const Reset = () => {
    const classes = useStyles();
    
    const [resetEmailSent, setResetEmailSent] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [counter, setCounter] = React.useState(30);
    const [email, setEmail] = React.useState('');

    const sendEmail = async () => {
      let emailResponse;
      try {
          emailResponse = await sendResetEmail(email);
          if (emailResponse) {
              setResetEmailSent(true);
              setButtonDisabled(true);
            SnackbarStore.showSuccess('Email sent');             
        } else {
          SnackbarStore.showError('Failed to send email'); 
        }
      } catch(err) {
          console.error(err);
          SnackbarStore.showError('Failed to send email'); 
      }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        sendEmail();
        setTimeout(() => setButtonDisabled(false), 30000);
      };

    
      React.useEffect(() => {
        if (buttonDisabled) {
          counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        };
      })

      const handleClick = () => {
        sendEmail();
        setTimeout(() => setButtonDisabled(false), 30000);
        setCounter(30);
      }  

    return (
        <Grid container item justify="center" alignItems="center">
        <Card className={classes.card}>
          {!resetEmailSent
          ? (
            <form onSubmit={handleSubmit}>
            <Grid container align="center" className={classes.content}>
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
                    An email has been sent to
                  </Typography>    
                  <Typography variant="h6" component="h1">
                    {email}
                  </Typography>                
                </Grid>                       
                <Grid item>               
                  {buttonDisabled
                  ? (
                    <Button variant="contained" color="primary" onClick={handleClick} disabled={buttonDisabled} className={classes.button}>
                    Resend in {counter} seconds
                  </Button>
                  ) :
                  (
                    <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>
                    Resend email
                  </Button>
                  )}
                 
                </Grid>
                <Grid item>       
                <Typography variant="body1" component="h1">
                    Didn't receive an email? Check your email is correct
                  </Typography>              
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