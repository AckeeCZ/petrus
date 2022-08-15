import { useState } from 'react';
import { loginRequest } from '@ackee/petrus';
import { useDispatch } from 'react-redux';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <>
            <h1>Sign-in:</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    dispatch(loginRequest({ password, email }));
                }}
            >
                <label htmlFor="email">
                    Email:
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="test@gmail.com"
                        required
                    />
                </label>
                <br />
                <label htmlFor="password">
                    Password:
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />
                </label>
                <br />
                <button type="submit">Sign-in</button>
            </form>
        </>
    );
};
