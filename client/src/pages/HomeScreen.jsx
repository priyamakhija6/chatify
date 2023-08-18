import React from 'react'
import {Box, Divider} from '@mui/material'
import SideBar from '../components/SideBar';
import {Route,Routes} from 'react-router-dom'
import Welcome from '../components/Welcome';
import ChatScreen from '../components/ChatScreen';

const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/:id/:name" element={<ChatScreen />} />
        </Routes>
    )
}


const HomeScreen = ({setloggedIn}) => {
    return (
        <Box
            display="flex"
            alignItems="stretch" // This ensures both items stretch to match the container's height
             height="100vh"
        >


            <SideBar setloggedIn={setloggedIn} />
            <Divider orientation="vertical"
                     sx={{
                         border: (theme) =>
                             `1px solid ${theme.palette.mode === 'dark' ? '#262B32' : '#B7CFDC'}`}}
            />
            <AllRoutes />
        </Box>
    )
}

export default HomeScreen