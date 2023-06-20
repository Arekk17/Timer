import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col justify-between bg-gray-800 text-white h-100px md:w-64 md:h-screen">
      <div className="py-4 px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">TaskTimer</h2>
        <button
          className='text-white focus:outline-none focus:text-gray-300 md:hidden'
          onClick={handleMenuToggle}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block flex-grow md:h-auto overflow-y-auto mb-5`}
      >
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={handleMenuToggle}
            >
              Timer
            </Link>
          </li>
          <li>
            <Link
              to="/graph"
              className="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={handleMenuToggle}
            >
              Raports
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
