import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import {AppBar, Toolbar, Avatar, Typography, Box, TextField, Stack, CircularProgress, Divider, IconButton} from '@mui/material'
import MessageCard from './MessageCard';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MSG } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MSG } from '../graphql/mutations';
// import { MSG_SUB } from '../graphql/subscriptions';
import jwt_decode from 'jwt-decode';

const ChatScreen = () => {
    const {id,name} = useParams()
    const [text,setText] = useState("")
    const [messages,setMessages] = useState([])
    // const {userId} = jwt_decode(localStorage.getItem('jwt'))


    const {data,loading,error} = useQuery(GET_MSG,{
        variables:{
            receiverId: +id
        },
        onCompleted(data){
            setMessages(data.messagesByUser)
        }
    });

    const [sendMessage] = useMutation(SEND_MSG,{
        onCompleted(data){
          setMessages((prevMessages)=>[...prevMessages,data.createMessage])
        }
    })

     async function handleSendClick (){
        const trimmedText = text.trim();
        if (trimmedText !== "") {
            await sendMessage({
                variables: {
                    receiverId: +id,
                    text: trimmedText
                }
            })
            setText('');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line in the text area
            handleSendClick(); // Trigger send action
        }
    };

    // const {data:subData} = useSubscription(MSG_SUB,{
    //     onSubscriptionData({subscriptionData:{data}}){
    //         if(
    //             (data.messageAdded.receiverId === +id && data.messageAdded.senderId === userId) ||
    //             (data.messageAdded.receiverId === userId && data.messageAdded.senderId === +id)
    //         ){
    //             setMessages((prevMessages)=>[...prevMessages,data.messageAdded])
    //         }
    //     }
    // })

    return (
        <Box
            flexGrow={2}
            // sx={{overflowY:"none"}}
        >

            <AppBar position="static"
                    sx={{backgroundColor:'#D9E4EC',boxShadow:0}}
            >
                <Toolbar>
                    <Avatar
                        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
                        sx={{width:"30px",height:"30px",mr:2}}
                    />
                    <Typography variant="h7" color='#132880'>{name}</Typography>
                </Toolbar>
            </AppBar>
            <Divider
                sx={{
                    border: (theme) =>
                        `1px solid ${theme.palette.mode === 'dark' ? '#262B32' : '#B7CFDC'}`}}
            />
            <Box className='chat-screen'>
                {
                    loading ?
                        <Box textAlign="center">
                            <CircularProgress />
                        </Box>
                        : messages.map(msg=>{
                            return <MessageCard key={msg.createdAt} text={msg.text} date={msg.createdAt} direction={msg.receiverId === +id? "end":"start"} />
                        })
                }
            </Box>
            <Stack direction="row">
                <TextField
                    placeholder="Type a message"
                    variant="filled"
                    fullWidth
                    multiline
                    rows={1}
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

                <IconButton
                    className='button-icon custom-button-icon'
                    onClick={handleSendClick}
                >
                    <SendIcon fontSize="large" />
                </IconButton>

            </Stack>


        </Box>
    )

}
export default ChatScreen