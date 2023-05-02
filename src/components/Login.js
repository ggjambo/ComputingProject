//Imports for react, google and facebook buttons, firebase app, auth value and firebase
import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import 'firebase/compat/app';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app'; 

//Login function returning divs created with css and buttons
const Login = () => {
    return(
        <div id ="login-page">
            <div id="login-main">
                <div className="nav-bar">
                    <div className="logo-tab">
                       Welcome to: ShadeStack    
                    </div>
                </div>
                <div id="login-card2">
                    <h2>
                       The all purpose application for teaming up!
                    </h2>
                    <h2>
                       Chat in our main community feed
                    </h2>
                    <h2>
                    or
                    </h2>
                    <h2>
                        Create your own room with your team members!
                    </h2>
                </div>
                <div id="login-card">
                    <h2>
                        Your way to gaming groups now!
                    </h2>
                    <div className="login-button google"
                        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                        <GoogleOutlined /> Sign In / Up with Google
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Login;