import React from 'react'
import { Stack, Typography, Card } from '@mui/material';

const Welcome = () => {
    return (
            <Stack
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                className='welcome'
            >
                <Typography variant="h4" className='welcome-text'> Chatify 💬</Typography>
                <Typography variant="h6" className='welcome-text'>Chat, Collaborate, Connect</Typography>
            </Stack>

    )
}

export default Welcome