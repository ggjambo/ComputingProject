import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdatePassword = () => {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return setError('Passwords do not match');
        }

        const promises = [];
        setLoading(true);
        setError('');

        if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
        .then(() => {
            history.push('/');
        })
        .catch(() => {
            setError('Failed to update account');
        })
        .finally(() => {
            setLoading(false);
        });
    };

  return (
    <>
      <h2 className="text-center mb-4">Update Password</h2>
      {error && <div className="alert alert-danger">{error}
      </div>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                type="password"
                className="form-control"
                id="confirm-password"
                ref={confirmPasswordRef}
                required
             />
        </div>
        <button disabled={loading} className="btn btn-primary" type="submit">
              Update Password
        </button>
        </form>
            <div className="mt-3">
            <Link to="/">Cancel</Link>
        </div>
    </>
  );
};

export default UpdatePassword;