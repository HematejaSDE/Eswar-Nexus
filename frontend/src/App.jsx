import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import DashboardLayout from './components/DashboardLayout';
import AICoreAssistant from './pages/AICoreAssistant';
import Placements from './pages/Placements';
import Payments from './pages/Payments';
import Academics from './pages/Academics';
import { Toaster } from 'react-hot-toast';

// Loading Screen Component
const GlobalLoader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds loading experience
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 mb-8"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        
        <div className="h-8 relative w-64 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key="text1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 text-center text-primary font-medium tracking-widest text-sm uppercase"
            >
              Initializing Eswar AI...
            </motion.p>
            <motion.p
              key="text2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute inset-0 text-center text-accent font-medium tracking-widest text-sm uppercase"
            >
              Synchronizing Academic Intelligence...
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Keyboard Shortcuts Handler
const ShortcutHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      // / to open AI Assistant (This will be handled by ChatbotUI state, but we can focus it or trigger a global event)
      if (e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-ai-assistant'));
      }

      // G + D -> Dashboard
      if (e.key.toLowerCase() === 'g') {
        const handleSecondKey = (e2) => {
          if (e2.key.toLowerCase() === 'd') navigate('/dashboard');
          if (e2.key.toLowerCase() === 'a') navigate('/dashboard/assignments'); // Assuming this route exists
          window.removeEventListener('keydown', handleSecondKey);
        };
        window.addEventListener('keydown', handleSecondKey);
        setTimeout(() => window.removeEventListener('keydown', handleSecondKey), 1000); // 1s timeout
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
};

// Layout for public pages
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col relative bg-background">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ShortcutHandler />
      
      <AnimatePresence>
        {isLoading && <GlobalLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Toast Notifications */}
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#121212',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="placements" element={<Placements />} />
            <Route path="academics" element={<Academics />} />
            <Route path="payments" element={<Payments />} />
            <Route path="ai" element={<AICoreAssistant />} />
            <Route path="faculty" element={<FacultyDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            {/* Fallback for other dashboard routes */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">Module Under Construction</h2>
                  <p className="text-textMuted font-medium">This section of the Nexus is currently being upgraded.</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
