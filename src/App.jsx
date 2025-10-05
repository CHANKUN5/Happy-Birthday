import React, { useState } from 'react';
import CakeAnimation from './components/CakeAnimation';
import ImageCarousel from './components/ImageCarousel';
import HeartAnimation from './components/HeartAnimation';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('inicio');

  return (
    <div className="app-container">
      <div className="grid-background"></div>
      
      {currentView === 'inicio' && (
        <div className="inicio-view">
          <CakeAnimation />
          <h1 className="main-title">Feliz Cumpleaños Eunice</h1>
          <div className="buttons-container">
            <button className="main-button" onClick={() => setCurrentView('carousel')}>
              <span className="button-icon">📸</span>
              <span>Ver Recuerdos</span>
            </button>
            <button className="main-button" onClick={() => setCurrentView('heart')}>
              <span className="button-icon">💕</span>
              <span>Mensaje Especial</span>
            </button>
          </div>
        </div>
      )}
      
      {currentView === 'carousel' && (
        <ImageCarousel onClose={() => setCurrentView('inicio')} />
      )}
      
      {currentView === 'heart' && (
        <HeartAnimation onClose={() => setCurrentView('inicio')} />
      )}
    </div>
  );
}

export default App;