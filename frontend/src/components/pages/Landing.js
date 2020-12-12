import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Landing = () => {
    return (
        <>      
        <Typography variant='h5'>
            <Link href='/login'>Login</Link>
        </Typography>  
        <Typography variant='h5'>
            <Link href='/register'>Register</Link>
        </Typography>
        </>
    )
}

export default Landing;