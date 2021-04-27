import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  icon: {
    margin: '6px',
  },
});

const UsernameField = ({ value, onValueChange }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      fullWidth
      type='text'
      label='Username'
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={
        {
          endAdornment: (
            <InputAdornment position='end'>
              <Person
                className={classes.icon}
              />
            </InputAdornment>
          ),
        }
    }
      variant='filled'
      required
      maxLength='25'
    />
  );
};

UsernameField.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default UsernameField;