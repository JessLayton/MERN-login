import React from 'react';
import PropTypes from 'prop-types';

import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const EmailField = ({ value, onValueChange }) => {
  const [error, setError] = React.useState(false);

  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = (email) => emailCheck.test(email);

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
      onChange={handleChange}
      onBlur={handleValidate}
      fullWidth
      type='email'
      label='Email'
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={
        {
          endAdornment: (
            <InputAdornment position='end'>
              <EmailIcon
                edge='end'
              />
            </InputAdornment>
          ),
        }
      }
      variant='filled'
      required
      error={error}
      helperText={error ? 'Enter a valid email' : ''}
    />
  );
};

EmailField.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default EmailField;
