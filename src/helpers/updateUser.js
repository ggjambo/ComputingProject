import { storage } from '../firebase';
import axios from 'axios';

export const updateUser = async (uid, file) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(`avatars/${uid}`);

  // Upload the file to Firebase Storage
  await fileRef.put(file);

  // Get the download URL of the uploaded file
  const avatarURL = await fileRef.getDownloadURL();

  // Update the user's avatar in ChatEngine
  await axios.patch(
    `https://api.chatengine.io/users/${uid}/`,
    { avatar: avatarURL },
    {
      headers: {
        'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
      },
    }
  );
};