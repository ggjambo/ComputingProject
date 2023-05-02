//Imports for React, useRef, useState, useEffect, useHistory, ChatEngine, auth, useAuth, and axios
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { ChatEngineWrapper } from 'react-chat-engine';

import SearchBar from "./SearchBar"
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

    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //Block Users
    const [blockedUsers, setBlockedUsers] = useState([]);

    const blockUser = (username) => {
        // add the username to the blockedUsers array
        setBlockedUsers([...blockedUsers, username]);
      
        // block the user in Chat Engine
        ChatEngine.global.blockUser(username);
      };

    const isBlocked = (username) => {
        return blockedUsers.includes(username);
    };


    const handleSearch2 = async () => {
        // Call the Chat Engine API to search for users
        const response = await ChatEngine.global.searchUsers(searchQuery);
      
        // Update the search results state with the response
        setSearchResults(response.results);
      };
      

    useEffect(() => {
    // Fetch chats from ChatEngine API
        const fetchChats = async () => {
            const response = await axios.get('https://api.chatengine.io/chats', {
                headers: {
                    "project-id": process.env.REACT_APP_PROJECT_ID,
                    "user-name": user.email,
                    "user-secret": user.uid,
        },
    });

        setChats(response.data);
        setFilteredChats(response.data);
    };

        fetchChats();
     }, []);

    const handleSearch = (value) => {
        setSearchValue(value);
        const filtered = chats.filter((chat) =>
        chat.title.toLowerCase().includes(value.toLowerCase())
    );
        setFilteredChats(filtered);
    };

    //Handle Logout
    const handleLogout = async () => {
            await auth.signOut();

            history.push('/');

    }

    //Handle feed change
    const routeChange = () =>{ 
        let path = `newPath`;
        history.push('feed');
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
                "project-id": process.env.REACT_APP_PROJECT_ID,
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

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": process.env.REACT_APP_PROJECT_KEY } }
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
                <div onClick={routeChange} className="feed-tab">
                    Feed
                </div>
                <div onClick={() => history.push('/profile')} className="profilepage-tab">
                    Profile
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button onClick={handleSearch}>Search For User</button>
            </div>   
            <div>
                {searchResults.map((result) => (
                    <div key={result.username}>
                    <p>{result.username}</p>
                    </div>
                ))}
            </div>     
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button onClick={handleSearch}>Search User To Block</button>
            </div>
            <div>
                {searchResults.map((result) => (
                    <div key={result.username}>
                    <p>{result.username}</p>
                    <button onClick={() => blockUser(result.username)}>Block User</button>
                    </div>
                ))}
            </div>
            <div className="App">
            <SearchBar onSearch={handleSearch} />
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
                chats={filteredChats}
                isBlocked={isBlocked}
            />
            </div>
        </div>
    );
}

/*
<button onClick={() => blockUser('username_to_block')}>
             Block User
            </button>
*/

export default Chats;