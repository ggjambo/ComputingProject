//Imports for context, state, and effect, use history, and auth
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

//Create AuthContext
const AuthContext = React.createContext();

//Function to export entire context, return useContext Passing AuthContext into React UseContext
export const useAuth = () => useContext(AuthContext);


//Called when user object changes or history changes
//Children passes all jsx into Auth Provider
//Set loading object state
export const AuthProvider = ({ children }) => {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState (null);
        const history = useHistory();

        //Whenever the state of auth changed call user data
        useEffect(() => {
            auth.onAuthStateChanged((user) => {
                    setUser(user);
                    setLoading(false);
                    if(user) history.push('/chats');
            })
        }, [user, history]);

//Value user objectproperty
        const value = {user};

//If not loading show the children
        return (
                <AuthContext.Provider value={value}>
                    {!loading && children}
                </AuthContext.Provider>
        );
}