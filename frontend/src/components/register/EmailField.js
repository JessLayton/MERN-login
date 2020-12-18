import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const EmailField = ({ value, onBlur }) => {
    const [error, setError] = React.useState(false);

    const handleChange = (event) => {
        onBlur(event.target.value);
        handleValidate(event.target.value);
      };

      const emailCheck =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const validate = (value) => emailCheck.test(value);

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
                type='email'
                label='Email'
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <EmailIcon
                                    edge="end"
                                >                                                      
                                </EmailIcon>
                            </InputAdornment>
                        ),
                    }
                }
                variant="filled"
                required
                error={error}
                helperText={error ? 'Enter a valid email' : ''}
            />
            </>
    )
}

export default EmailField;