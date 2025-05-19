
import React from 'react';

interface ThreeDBackgroundProps {
  className?: string;
}

const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-traccbox-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-24 w-80 h-80 bg-traccbox-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-traccbox-400/10 rounded-full blur-3xl"></div>
      
      {/* 3D-like elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/30 rounded-xl rotate-12 backdrop-blur-sm border border-white/20 shadow-xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-white/20 rounded-xl -rotate-12 backdrop-blur-sm border border-white/10 shadow-lg"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
  );
};

export default ThreeDBackground;
