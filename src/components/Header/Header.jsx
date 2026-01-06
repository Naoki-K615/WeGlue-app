import React from "react";

const Header = () => {
  return (
    <nav className="bg-white shadow-md w-full px-4 md:px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50 h-16 md:h-20">

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 md:px-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 drop-shadow-md md:drop-shadow-lg tracking-wide">
          Vote wisely, your choice today shapes our campus tomorrow.
        </h1>
      </div>
      
    </nav>
  );
};

export default Header;
