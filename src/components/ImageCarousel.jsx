import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      src: '/IMAGEN 1.jpeg',
      caption: 'Desde el primer día, supe que serías especial ✨'
    },
    {
      src: '/IMAGEN 2.jpeg',
      caption: 'Cada momento contigo es un regalo 🎁'
    },
    {
      src: '/IMAGEN 3.jpeg',
      caption: 'Gracias por ser mi persona favorita 💕'
    },
    {
      src: '/IMAGEN 4.jpeg',
      caption: 'Risas, locuras y aventuras sin fin 🌟'
    },
    {
      src: '/IMAGEN 5.jpeg',
      caption: 'Mi confidente, mi cómplice, mi hermana del alma 👯‍♀️'
    },
    {
      src: '/IMAGEN 6.jpeg',
      caption: 'Los mejores recuerdos son los que creamos juntas 📸'
    },
    {
      src: '/IMAGEN 7.jpeg',
      caption: 'Tu amistad es el mejor tesoro que tengo 💎'
    },
    {
      src: '/IMAGEN 8.jpeg',
      caption: 'Porque contigo todo es mejor 🌈'
    },
    {
      src: '/IMAGEN 9.jpeg',
      caption: 'Amigas por siempre, pase lo que pase 🤝'
    },
    {
      src: '/IMAGEN 10.jpeg',
      caption: 'Gracias por existir y por estar siempre ahí 🙏'
    },
    {
      src: '/IMAGEN 11.jpeg',
      caption: 'Que vengan muchos años más de amistad 🎂'
    },
    {
      src: '/IMAGEN 12.jpeg',
      caption: 'Feliz cumpleaños a la mejor amiga del mundo! 🎉'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <button className="close-btn" onClick={onClose}>✕</button>
      
      <div className="carousel-content">
        <h2 className="carousel-title">Nuestros Recuerdos</h2>
        
        <div className="carousel-wrapper">
          <button className="nav-btn prev" onClick={prevImage}>‹</button>
          
          <div className="image-container">
            <div className="image-frame">
              <img 
                src={images[currentIndex].src} 
                alt={`Recuerdo ${currentIndex + 1}`}
                className="carousel-image"
              />
            </div>
            <p className="image-caption">{images[currentIndex].caption}</p>
            <p className="image-counter">{currentIndex + 1} / {images.length}</p>
          </div>
          
          <button className="nav-btn next" onClick={nextImage}>›</button>
        </div>
        
        <div className="indicators">
          {images.map((_, i) => (
            <span 
              key={i}
              className={i === currentIndex ? 'indicator active' : 'indicator'}
              onClick={() => goToImage(i)}
            />
          ))}
        </div>
        
        <button 
          className="auto-play-btn"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? '⏸ Pausar' : '▶ Reproducir'}
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;
