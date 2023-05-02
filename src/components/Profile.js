import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { updateUser } from '../helpers/updateUser';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const handleChangePassword = () => {
    history.push('/update-password');
  };

  const handleUpdateAvatar = async (e) => {
    setLoading(true);
    await updateUser(user.uid, e.target.files[0]);
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
        <div className="profile-actions">
          <label htmlFor="avatar" className="update-avatar">
            {loading ? 'Updating...' : 'Update Avatar'}
            <input
              id="avatar"
              type="file"
              onChange={handleUpdateAvatar}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Profile;