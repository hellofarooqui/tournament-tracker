import React from "react";

const CustomModal = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-dark-gray/70 backdrop-blur-2xl fixed top-0 left-0 z-50 p-4">
      <div className="w-full h-full bg-dark-black overflow-y-scroll p-6 rounded-lg pb-20 scrollbar-none">
        {children}
        
        </div>
    </div>
  );
};

export default CustomModal;
