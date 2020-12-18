import React from 'react';
import TextField from '@material-ui/core/TextField';

const UsernameField = ({ value, onBlur }) => {
  const handleChange = (event) => {
    onBlur(event.target.value);
  };     

  return (
    <>
    <TextField
      defaultValue={value}
      onBlur={handleChange}
      fullWidth
      type='text'
      label='Username'
      InputLabelProps={{
          shrink: true,
      }}              
      variant="filled"
      required
      maxLength='25'
    />
</>
    )
}

export default UsernameField;