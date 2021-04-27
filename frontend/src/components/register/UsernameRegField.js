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

  const [error, setError] = React.useState(false);

  const validate = (username) => username.length >= 5;

  const handleValidate = (event) => {
    if (validate(event.target.value)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <TextField
      value={value}
      onBlur={handleValidate}
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
      error={error}
      helperText={error ? 'Username must be at least 5 characters' : ''}
      maxLength='25'
    />
  );
};

UsernameField.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default UsernameField;