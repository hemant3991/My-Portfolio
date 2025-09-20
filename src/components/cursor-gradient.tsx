'use client';

import { useEffect, useState } from 'react';

interface CursorGradientProps {
  children: React.ReactNode;
}

export function CursorGradient({ children }: CursorGradientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {children}

      {/* Subtle cursor gradient across entire website */}
      <div
        className="fixed pointer-events-none z-30"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 25%, rgba(236, 72, 153, 0.02) 50%, transparent 85%)',
          transform: 'translate(0, 0)',
          filter: 'blur(6px)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
