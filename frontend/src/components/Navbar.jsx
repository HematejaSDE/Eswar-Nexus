import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Hexagon, LayoutDashboard, LogOut, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/');
  };

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Programs', path: '/#departments' },
    { name: 'Campus', path: '/#campus' },
    { name: 'Placements', path: '/#placements' },
    { name: 'Results', path: '/#results' },
  ];

  return (
    <div className="fixed w-full z-50 top-0 flex flex-col items-center shadow-sm">
      
      {/* TOP ACCREDITATION BAR - Solid Blue */}
      <div className={`w-full bg-blue-900 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p className="text-blue-100 font-medium tracking-wide mb-1 sm:mb-0">An UGC Autonomous Institution</p>
          <div className="flex items-center gap-3 text-white font-semibold">
            <span className="flex items-center gap-1"><Award className="w-3 h-3 text-yellow-400"/> AICTE Approved</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-400"/> JNTUK Affiliated</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="flex items-center gap-1"><Award className="w-3 h-3 text-red-400"/> NAAC B++</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-yellow-400 font-bold">CODE: ESWR</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR - Clean White */}
      <nav className={`w-full bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-3'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center p-1 border border-blue-100 group-hover:bg-blue-100 transition-colors">
               <Hexagon className="w-full h-full text-blue-800" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-blue-900 leading-none">
                ESWAR
              </span>
              <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase leading-none mt-1">
                College of Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            
            {/* Action Button */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              {isLoggedIn ? (
                <Link to="/dashboard" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              ) : (
                <Link to="/login" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-white border-b border-gray-100 overflow-hidden lg:hidden shadow-lg"
          >
            <div className="flex flex-col p-4 space-y-2">
              {mainNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 p-3 rounded-xl transition-all flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-bold text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-all text-center shadow-md"
                >
                  Sign In to Portal
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
