import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { 
  Hexagon, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  Sparkles
} from 'lucide-react';
import ChatbotUI from './ChatbotUI';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Auth guard — redirect to login if no token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Placements', path: '/dashboard/placements', icon: Hexagon },
    { name: 'Academics', path: '/dashboard/academics', icon: BookOpen },
    { name: 'Payments', path: '/dashboard/payments', icon: CreditCard },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-background text-text flex overflow-hidden selection:bg-primary/30">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Ultra-Minimal Sidebar */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ 
          width: isHovered ? 260 : 88,
          x: sidebarOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:relative z-50 h-[calc(100vh-32px)] my-4 ml-4 rounded-[2rem] glass flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-24 flex items-center justify-center lg:justify-start lg:px-7 border-b border-white/[0.05] overflow-hidden shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <Hexagon className="w-9 h-9 text-primary shrink-0" />
            <AnimatePresence>
              {(isHovered || sidebarOpen) && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xl font-bold tracking-tight text-white whitespace-nowrap"
                >
                  Eswar Nexus
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden absolute right-4 text-textMuted hover:text-white bg-white/5 p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'text-white' 
                    : 'text-textMuted hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
                  <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'group-hover:scale-110'}`} />
                </div>
                <AnimatePresence>
                  {(isHovered || sidebarOpen) && (
                    <motion.span 
                      initial={{ opacity: 0, w: 0 }}
                      animate={{ opacity: 1, w: "auto" }}
                      exit={{ opacity: 0, w: 0 }}
                      className="relative z-10 text-[15px] font-semibold whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        {/* AI Pulse Indicator & User Orb */}
        <div className="p-4 border-t border-white/[0.05] shrink-0 flex flex-col gap-2">
          <Link 
            to="/dashboard/ai"
            onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-textMuted hover:text-white hover:bg-white/5 transition-colors group overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
              <Sparkles className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <span className="absolute inset-0 rounded-full border border-accent/50 animate-ping opacity-50" />
            </div>
            <AnimatePresence>
              {(isHovered || sidebarOpen) && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[15px] font-semibold whitespace-nowrap text-accent"
                >
                  Eswar AI Core
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          <Link to="/dashboard/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-textMuted hover:text-white hover:bg-white/5 transition-colors overflow-hidden">
            <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
               {/* Profile Orb */}
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
                 <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                 </div>
               </div>
            </div>
            <AnimatePresence>
              {(isHovered || sidebarOpen) && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[15px] font-semibold whitespace-nowrap"
                >
                  Hemateja P
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-colors overflow-hidden w-full group"
          >
            <div className="relative z-10 flex items-center justify-center w-6 h-6 shrink-0">
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <AnimatePresence>
              {(isHovered || sidebarOpen) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[15px] font-semibold whitespace-nowrap"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area - Floating Surface */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Ambient Background Mesh */}
        <div className="absolute inset-0 bg-mesh-subtle opacity-50 pointer-events-none" />

        {/* Top Header - Ultra Minimal */}
        <header className="h-28 flex items-center justify-between px-6 lg:px-12 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-textMuted hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight hidden sm:block">
                {location.pathname.split('/').pop() === 'dashboard' ? 'Overview' : location.pathname.split('/').pop()}
              </h1>
              <p className="text-sm font-medium text-textMuted hidden sm:block mt-1">Eswar College of Engineering</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-textMuted hover:text-white hover:bg-white/10 transition-all group shadow-sm">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-12 pb-12 z-10 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Global AI Assistant */}
      <ChatbotUI />
    </div>
  );
};

export default DashboardLayout;
