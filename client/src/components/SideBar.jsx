import React from 'react'
import {Box, Typography, Divider, Stack, CircularProgress} from '@mui/material'
import UserCard from './UserCard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/queries';

const SideBar = ({setloggedIn}) => {

    const  {loading,data,error} =  useQuery(GET_ALL_USERS);

    if(loading) return (
        <Box textAlign="center">
            <CircularProgress />
            <Typography variant="h6"className='welcome-text'>Loading...</Typography>
        </Box>
    );

    if(error){
        console.log(error.message)
    }

    return (
        <Box
            className='welcome'
            // height="97vh"
            // width="250px"
            padding="10px"
        >
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6" className='welcome-text'>Chatify 💬</Typography>
                <LogoutIcon className='button-icon'
                    onClick={()=>{
                    localStorage.removeItem('jwt')
                    setloggedIn(false)
                }} />
            </Stack>
            {
                data.users.map(item=>{
                    return <UserCard key={item.id} item={item} />
                })
            }
        </Box>
    )
}

export default SideBar