import React from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';

const Feed = () => {
 //Use history for history
 const history = useHistory ();

 //Handle feed change
 const routeChange = () =>{ 
     let path = `newPath`;
     history.push('chats');
 }    

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ShadeStack    
                </div>
                <div onClick={routeChange} className="feed-tab">
                    Feed
                </div>
            </div>
        <ChatEngineWrapper data-testid="chat-engine-wrapper">
            <ChatSocket 
                data-testid="chat-socket"
                projectID='fc01842d-4c85-476e-b75c-cc5a0fd3df95'
                chatID='165492'
                chatAccessKey='1234'
                senderUsername='Anonymous'
            />
            <ChatFeed data-testid="chat-feed" activeChat='123' /> 
        </ChatEngineWrapper>
        </div>
    )
}

export default Feed;