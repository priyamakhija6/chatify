import React from 'react'
import { Stack, Typography, Card } from '@mui/material';

const Header = () => {
    return (
        <Card  variant="outlined"
               sx={{padding:"10px"}}
               className='welcome'>
            <Stack
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
            >
                <Typography variant="h4" className='welcome-text'> Chatify 💬</Typography>
                <Typography variant="h6" className='welcome-text'>Chat, Collaborate, Connect</Typography>
            </Stack>
        </Card>
    )
}

export default Header