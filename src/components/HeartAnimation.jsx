import React, { useEffect, useRef, useState } from 'react';
import './HeartAnimation.css';

function HeartAnimation({ onClose }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initScene = () => {
      const THREE = window.THREE;
      
      if (!THREE) {
        console.error('Three.js no cargado');
        return;
      }

      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
      );
      camera.position.z = 500;

      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: false,
        powerPreference: "high-performance"
      });
      rendererRef.current = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      const path = document.querySelector('#heart-path');
      const length = path.getTotalLength();
      const vertices = [];
      const targetPositions = [];
      
      const centerX = 600 / 2;
      const centerY = 552 / 2;
      
      const step = 0.5;
      for (let i = 0; i < length; i += step) {
        const point = path.getPointAtLength(i);
        
        const targetVector = new THREE.Vector3(
          point.x - centerX + (Math.random() - 0.5) * 20,
          -point.y + centerY + (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 50
        );
        targetPositions.push(targetVector);
        
        const startVector = new THREE.Vector3(0, 0, 0);
        vertices.push(startVector);
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
      const material = new THREE.PointsMaterial({ 
        color: 0xee5282, 
        blending: THREE.AdditiveBlending, 
        size: 4,
        sizeAttenuation: true
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let animationProgress = 0;
      const animationDuration = 2000;
      const startTime = Date.now();
      let isAnimating = true;

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function animate() {
        animationIdRef.current = requestAnimationFrame(animate);
        
        if (isAnimating) {
          const elapsed = Date.now() - startTime;
          animationProgress = Math.min(elapsed / animationDuration, 1);
          const easedProgress = easeOutCubic(animationProgress);
          
          vertices.forEach((vertex, i) => {
            const target = targetPositions[i];
            vertex.x = target.x * easedProgress;
            vertex.y = target.y * easedProgress;
            vertex.z = target.z * easedProgress;
          });
          
          geometry.setFromPoints(vertices);
          
          if (animationProgress >= 1) {
            isAnimating = false;
          }
        }
        
        renderer.render(scene, camera);
      }

      setIsLoading(false);
      animate();

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      
      window.addEventListener('resize', onWindowResize);

      return () => {
        window.removeEventListener('resize', onWindowResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (rendererRef.current && containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    };

    const timer = setTimeout(initScene, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="heart-container">
      <button className="close-btn" onClick={onClose}>✕</button>
      
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      
      <div className="heart-message">
        <h2 className="heart-title">Para ti, Eunice</h2>
        <p className="heart-text">
          Cada partícula de este corazón representa un momento especial que hemos compartido.
          Gracias por llenar mi vida de colores y alegría. 
          ¡Feliz cumpleaños, mi mejor amiga! 💕
        </p>
      </div>
      
      <div ref={containerRef} className="canvas-wrapper"></div>
      
      <svg style={{ display: 'none' }} viewBox="0 0 600 552">
        <path 
          id="heart-path"
          d="M300,107.77C284.68,55.67,239.76,0,162.31,0,64.83,0,0,82.08,0,171.71c0,.48,0,.95,0,1.43-.52,19.5,0,217.94,299.87,379.69v0l0,0,.05,0,0,0,0,0v0C600,391.08,600.48,192.64,600,173.14c0-.48,0-.95,0-1.43C600,82.08,535.17,0,437.69,0,360.24,0,315.32,55.67,300,107.77" 
          fill="#ee5282"
        />
      </svg>
    </div>
  );
}

export default HeartAnimation;