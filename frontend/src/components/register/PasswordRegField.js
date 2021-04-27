import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';

const PasswordField = ({ label, value, onValueChange }) => {
  const [error, setError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const passwordCheck = /^((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,})$/;

  const validate = (passwordValue) => passwordCheck.test(passwordValue);

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl>
      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        onBlur={handleValidate}
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={
          {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={toggleShowPassword}
                  edge='end'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
                }
        variant='filled'
        autoComplete='new-password'
        required
        error={error}
        helperText={error ? 'Choose a more secure password' : ''}
      />
    </FormControl>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  label: 'Password',
};

export default PasswordField;