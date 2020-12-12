import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import UserContext from "../../context/userContext";

const LogoutButton = () => {
    const { setUserData } = useContext(UserContext);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '');
    }

    return (
        <>
        <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
        </>
    )
}

export default LogoutButton;