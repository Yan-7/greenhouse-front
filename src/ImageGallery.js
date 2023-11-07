import React from 'react';
import lettuceImage from './pic/letuce.jpg';
import onionImage from './pic/onion.jpg';
import tomatoImage from './pic/tomato.jpg';

const images = [lettuceImage, onionImage, tomatoImage];

const ImageGallery = () => (
  <div className="image-gallery">
    {images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Gallery item ${index + 1}`}
        className="gallery-image"
      />
    ))}
  </div>
);

export default ImageGallery;
