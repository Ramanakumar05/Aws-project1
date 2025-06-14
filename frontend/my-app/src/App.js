import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Upload from './Upload';
import Gallery from './Gallery';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [signup, setSignup] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return signup ? (
      <Signup onSwitch={() => setSignup(false)} />
    ) : (
      <Login onLogin={() => setIsLoggedIn(true)} onSwitch={() => setSignup(true)} />
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>AWS Image Uploader 🖼️</h2>
      <button onClick={logout}>Logout</button>
      <Upload onUpload={() => window.location.reload()} />
      <Gallery />
    </div>
  );
}

export default App;
