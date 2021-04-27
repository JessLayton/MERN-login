import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';

const PasswordField = ({ value, onValueChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);

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
        label='Password'
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
        required
      />
    </FormControl>
  );
};

PasswordField.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PasswordField;