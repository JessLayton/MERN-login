import React from 'react';
import TextField from '@material-ui/core/TextField';

const UsernameField = ({ value, onBlur }) => {
    const [error, setError] = React.useState(false);

    const handleChange = (event) => {
        onBlur(event.target.value);
        handleValidate(event.target.value);
      };

      const validate = (value) => value.length >= 5;

      const handleValidate = (value) => {
        if (validate(value)) {
          setError(false);
        }
        else {
          setError(true);
        }    
      }

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
                error={error}
                helperText={error ? 'Username must be at least 5 characters' : ''}
                maxLength='25'
            />
            </>
    )
}

export default UsernameField;