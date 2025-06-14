import React, { useEffect, useState } from 'react';
import API from './api';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await API.get('/images/gallery');
      setGallery(res.data.images);
    } catch {
      alert('Failed to load gallery');
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
      {gallery.map((url, i) => (
        <img key={i} src={url} alt={`img-${i}`} width={200} style={{ margin: 10, borderRadius: 8 }} />
      ))}
    </div>
  );
}
