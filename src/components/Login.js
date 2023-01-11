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
             <div id="login-card">
                <h2>Welcome to ShadeStack!</h2>
                 <div className="login-button google"
                     onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                 >
                    <GoogleOutlined /> Sign In with Google
                 </div>

                <br /> <br />
                <div className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div> 
    );
}

export default Login;