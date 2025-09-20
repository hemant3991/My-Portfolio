'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
}

export function CardTilt({ children, className = '', intensity = 10, scale = 1.02 }: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -intensity;
    const rotateY = (x - centerX) / centerX * intensity;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${isHovered ? scale : 1})
      translateZ(0)
    `;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`interactive-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: scale,
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.1 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}
