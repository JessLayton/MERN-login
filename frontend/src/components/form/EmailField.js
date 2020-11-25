import React from 'react';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const EmailField = () => {
    return (
        <>
            <TextField
                fullWidth
                type='email'
                label='email'
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
            />
            </>
    )
}

export default EmailField;