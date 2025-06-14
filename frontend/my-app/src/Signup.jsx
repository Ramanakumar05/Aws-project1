import React, { useState } from 'react';
import API from './api';

export default function Signup({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      await API.post('/auth/signup', { email, password });
      alert('Signup successful! Please login.');
      onSwitch();
    } catch {
      alert('Signup failed.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
}
