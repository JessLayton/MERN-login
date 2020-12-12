import React from 'react';
import TextField from '@material-ui/core/TextField';

const UsernameField = ({ value, onChange }) => {

    const handleChange = (event) => {
        onChange(event.target.value);
      };

    return (
        <>
            <TextField
                defaultValue={value}
                onChange={handleChange}
                fullWidth
                type='text'
                label='Username'
                InputLabelProps={{
                    shrink: true,
                }}              
                variant="filled"
                required
            />
            </>
    )
}

export default UsernameField;