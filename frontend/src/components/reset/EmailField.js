import React from 'react';
import PropTypes from 'prop-types';

import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const EmailField = ({ value, onValueChange }) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <>
      <TextField
        defaultValue={value}
        onChange={handleChange}
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
      />
    </>
  );
};

EmailField.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default EmailField;
