import React from 'react';

import { AppBar, Toolbar, Typography, Grid, makeStyles } from '@material-ui/core';
import LogoutButton from './LogoutButton';

const useStyles = makeStyles({
  navbarSpacer: {
    height: '100px',
  },
  toolBar: {
    minHeight: '85px',
  }, 
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <Grid container item spacing={2} alignItems='center'>             
              <Grid item>
                <Typography variant='h3' component='h1'>
                  Auth App
                </Typography>
              </Grid>
              <Grid item>
               <LogoutButton/>
              </Grid>
            </Grid>
          </Grid>         
        </Toolbar>
      </AppBar>     
      <div className={classes.navbarSpacer} />
    </>
  );
};

export default Navbar;
