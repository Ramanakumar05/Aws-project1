import React, { useState } from 'react';
import API from './api';

export default function Upload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const upload = async () => {
    if (!file) return alert("Choose a file!");
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      await API.post('/images/upload', formData);
      alert('Upload successful!');
      setFile(null);
      onUpload(); // Refresh gallery
    } catch {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
