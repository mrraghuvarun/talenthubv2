import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[#353939]/20 animate-[spin_2s_linear_infinite]" />
        {/* Inner ring */}
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#353939] animate-[spin_1.5s_linear_infinite] absolute inset-0" />
        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#353939] font-medium text-sm">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;