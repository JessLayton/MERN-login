import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  spinner: {
    marginLeft: '50%',
    marginTop: '150px',
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <CircularProgress className={classes.spinner} size={35} />
  );
};

export default Loading;
