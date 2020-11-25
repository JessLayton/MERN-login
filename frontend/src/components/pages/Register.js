import {
  Card,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import React from 'react';
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

const Register = () => {
  const classes = useStyles();

  return (
    <Grid container item justify='center' alignItems='center'>
      <Card className={classes.card}>
        <form>
          <Grid container align='center' className={classes.form}>
            <Grid
              container
              item
              justify='center'
              alignItems='center'
            >
              <Grid container spacing={2} direction='column'>
                <Grid item>
                  <Typography variant='h3' component='h1'>
                    Register
                  </Typography>
                </Grid>
                <Grid item>
                  <EmailField />
                </Grid>
                <Grid item>
                    <TextField
                      fullWidth
                      type='text'
                      label='username'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='filled'
                      required
                      maxLength='25'
                    />
                </Grid>
                <Grid item>
                  <PasswordField label='password' />
                </Grid>
                <Grid item>
                  <PasswordField label='confirm password' />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    Already have an account?{' '}
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
