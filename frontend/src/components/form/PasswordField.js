import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';

const PasswordField = ({ label }) => {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl>
            <TextField
                fullWidth
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                label={label}
                InputLabelProps={{
                    shrink: true,
                  }}
                InputProps={
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}                            
                                </IconButton>
                            </InputAdornment>
                        ),
                    }
                }
                variant="filled"
               required
            />
        </FormControl>
    )
}

export default PasswordField;