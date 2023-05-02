import { storage } from '../firebase';
import axios from 'axios';

jest.mock('../firebase', () => ({
  storage: {
    ref: jest.fn(),
  },
}));

jest.mock('axios');

describe('updateUser', () => {
  const uid = 'user123';
  const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
  const putMock = jest.fn(() => Promise.resolve());
  const getDownloadURLMock = jest.fn(() => Promise.resolve('https://example.com/avatar.png'));

  beforeEach(() => {
    jest.clearAllMocks();
    storage.ref.mockReturnValue({
      child: jest.fn(() => ({
        put: putMock,
        getDownloadURL: getDownloadURLMock,
      })),
    });
  });

  it('uploads the file to Firebase Storage and updates the user avatar in ChatEngine', async () => {
    axios.patch.mockResolvedValueOnce({ data: {} });

    await updateUser(uid, file);

    expect(storage.ref).toHaveBeenCalledTimes(1);
    expect(storage.ref).toHaveBeenCalledWith('avatars/user123');
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith(file);
    expect(getDownloadURLMock).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith(
      `https://api.chatengine.io/users/${uid}/`,
      { avatar: 'https://example.com/avatar.png' },
      {
        headers: {
          'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );
  });

  it('throws an error if there was a problem uploading the file to Firebase Storage', async () => {
    putMock.mockRejectedValueOnce(new Error('Upload error'));

    await expect(updateUser(uid, file)).rejects.toThrow('Upload error');

    expect(storage.ref).toHaveBeenCalledTimes(1);
    expect(storage.ref).toHaveBeenCalledWith('avatars/user123');
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith(file);
    expect(getDownloadURLMock).not.toHaveBeenCalled();
    expect(axios.patch).not.toHaveBeenCalled();
  });

  it('throws an error if there was a problem updating the user avatar in ChatEngine', async () => {
    putMock.mockResolvedValueOnce();
    axios.patch.mockRejectedValueOnce(new Error('ChatEngine error'));

    await expect(updateUser(uid, file)).rejects.toThrow('ChatEngine error');

    expect(storage.ref).toHaveBeenCalledTimes(1);
    expect(storage.ref).toHaveBeenCalledWith('avatars/user123');
    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith(file);
    expect(getDownloadURLMock).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith(
      `https://api.chatengine.io/users/${uid}/`,
      { avatar: 'https://example.com/avatar.png' },
      {
        headers: {
          'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );
  });
});
