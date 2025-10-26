import React from 'react';

const GradientLogo = () => {
  return (
    
      <div className="animate-[spin_9s_linear_infinite] relative w-32 h-32 bg-gradient-to-br from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B] rounded-3xl shadow-2xl">
        {/* Main circular design */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center relative">
            {/* Inner ring */}
            <div className="w-12 h-12 border-3 border-white rounded-full flex items-center justify-center relative">
              {/* Center dot */}
              <div className="w-4 h-4 bg-white rounded-full"></div>
              
              {/* Small dots around inner ring */}
              {/* <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div> */}
            </div>
            
            {/* Dots around outer ring */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
   
  );
};

export default GradientLogo;