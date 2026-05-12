import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Hexagon, ArrowRight, BookOpen, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-surfaceLight border border-white/10 shadow-glass rounded-[1.5rem] pointer-events-auto flex items-center p-4 gap-4`}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 overflow-hidden">
           {data.user.avatar ? (
            <img src={data.user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <Hexagon className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">
            Welcome to Eswar Nexus
          </p>
          <p className="text-xs text-textMuted mt-0.5 font-medium">
            Account created successfully.
          </p>
        </div>
      </motion.div>
    ), { duration: 4000 });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      handleAuthSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to server. Please try again.');
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setError('');
      try {
        const { data: googleUser } = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const response = await axios.post('http://localhost:5000/api/auth/google-token', {
          googleId: googleUser.sub,
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture,
        });

        handleAuthSuccess(response.data);
      } catch (err) {
        setError('Google authentication failed. Please try again.');
        toast.error('Google verification failed');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setError('Google login popup was closed or failed.');
      toast.error('Google login cancelled');
    }
  });

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-accent/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-mesh-subtle opacity-50" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "spring" }}
          className="w-full max-w-[420px]"
        >
          {/* Main Card */}
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent to-primary opacity-50" />
            
            <div className="flex justify-center mb-8">
              <Link to="/" className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-glow-sm">
                <Hexagon className="w-8 h-8 text-accent" />
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
              <p className="text-textMuted text-sm font-medium">Join the Eswar Nexus ecosystem.</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl mb-6 text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted group-focus-within:text-accent transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all sm:text-sm font-medium"
                    placeholder="Full Name"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted group-focus-within:text-accent transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all sm:text-sm font-medium"
                    placeholder="College Email Address"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textMuted group-focus-within:text-accent transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all sm:text-sm font-medium"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-textMuted hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'student' })}
                      className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 transition-all font-bold text-sm ${
                        formData.role === 'student' 
                          ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(94,92,230,0.2)]' 
                          : 'bg-white/5 border-white/10 text-textMuted hover:bg-white/10'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" /> Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'faculty' })}
                      className={`py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 transition-all font-bold text-sm ${
                        formData.role === 'faculty' 
                          ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(94,92,230,0.2)]' 
                          : 'bg-white/5 border-white/10 text-textMuted hover:bg-white/10'
                      }`}
                    >
                      <User className="w-4 h-4" /> Faculty
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-glow-sm text-sm font-bold text-white bg-accent hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1A1D24] text-textMuted font-medium">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full flex items-center justify-center px-4 py-4 border border-white/10 rounded-2xl shadow-sm text-sm font-bold text-white bg-white/5 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 focus:ring-offset-background disabled:opacity-50"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-textMuted font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-accent hover:text-indigo-400 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
