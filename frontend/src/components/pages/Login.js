import React from "react";

import { Card, Grid, makeStyles, Typography, Button, Link } from '@material-ui/core';

import EmailField from '../form/EmailField';
import PasswordField from '../form/PasswordField';

const useStyles = makeStyles(() => ({
    card: {
        marginTop: '30px',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    form: {
        marginTop: '30px',
        marginBottom: '30px'
    }
})
);

const Login = () => {
    const classes = useStyles();
   
    return (
        <Grid container>
            <Grid container item justify="center" alignItems="center">
                <Card className={classes.card}>
                    <form>
                        <Grid container align="center" className={classes.form}>
                            <Grid container item xs={12} sm={11} justify="center" alignItems="center">
                                <Grid container spacing={2} direction='column'>
                                    <Grid item>
                                        <Typography variant='h3' component='h1'>
                                            Login
                                        </Typography>
                                    </Grid>
                                    <Grid container item>
                                    </Grid>
                                    <Grid item>
                                        <EmailField />
                                    </Grid>                                   
                                    <Grid item>
                                        <PasswordField label='password' />
                                    </Grid>                                  
                                    <Grid item>
                                        <Button variant='contained' color='primary'>
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1'>Don't have an account yet? </Typography>
                                        <Typography variant='body1'>
                                            <Link href='/register'>
                                                Register here
                                            </Link> 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Grid>


    )
}

export default Login;