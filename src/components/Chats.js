//Imports for React, useRef, useState, useEffect, useHistory, ChatEngine, auth, useAuth, and axios
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

//Chats function
const Chats = () => {
    
    //Use history for history
    const history = useHistory ();

    //User user for useAuth
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    //Log user
    console.log(user);    
    
    //Handle Logout
    const handleLogout = async () => {
            await auth.signOut();

            history.push('/');

    }

//Get user profile image
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpg' })
    }

//If there is no user then redirect to login
    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

//Axios call to get account if already created
//If not, create account
        axios.get('https://api.chatengine.io/users/me' , {
            headers: {
                "project-id": "e03b386a-7be9-4029-8f19-429c9d5ab227",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name)

                        axios.post('https://api.chatengine.io/users',
                            formdata,
                            { headers: { "private-key": "b03b9679-7dea-476a-a59c-92e267e6bd72"} }
                        )
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error))
                    })
        })
    }, [user, history]);

    //If the user is loading return loading
    if(!user || loading) return 'Loading ...';

    //Return navbar and chatengine when logged in
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ShadeStack    
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
            height="calc(100vh - 66px)"
            projectID="e03b386a-7be9-4029-8f19-429c9d5ab227"
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;