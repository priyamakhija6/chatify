import React from 'react'
import {Typography, Box } from '@mui/material';

const MessageCard = ({text,date,direction}) => {
    const backgroundColor = direction === 'end' ? '#FEE7E6' : '#ECFDF1';
    const color  =  direction === 'end' ? '#65463E' : '#2B7C85';


    return (

        <Box
            display="flex"
            justifyContent={direction}
        >

            <Box>
                <Typography
                    variant="subtitle2"
                    padding="5px"
                    backgroundColor={backgroundColor}
                    color={color}
                    borderRadius="15px"
                >{text}</Typography>
                <Typography
                    variant="caption"
                >{new Date(date).toLocaleTimeString()}</Typography>
            </Box>
        </Box>

    )
}

export default MessageCard