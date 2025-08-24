import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${config.api.baseUrl}/auth/login`, {
        username,
        password
      });

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-30" />
      <div className="fixed inset-0 bg-gradient-radial from-black/10 via-transparent to-transparent" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,16,240,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-dark rounded-3xl p-8 border border-white/10">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <motion.div 
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="white"
                className="transform"
                style={{ transform: 'rotate(345deg)' }}
              >
                <path d="M3 3l18 9-9 2-2 9z" />
              </svg>
            </motion.div>
            <div className="flex items-center space-x-1">
              <span className="text-3xl font-black text-orange-500 tracking-wider">
                NAASS
              </span>
              <span className="text-xs text-orange-500 font-medium tracking-widest uppercase">
                Admin
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">Welcome Back</h2>
          <p className="text-orange-500/60 text-center mb-8">Sign in to access your dashboard</p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gray-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <p className="text-orange-500 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-orange-500/80 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-orange-500 placeholder-white/40 focus:outline-none focus:border-black/50 transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-orange-500/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-orange-500 placeholder-white/40 focus:outline-none focus:border-black/50 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white/5 border border-white/20 rounded checked:bg-black checked:border-black focus:outline-none"
                />
                <span className="text-orange-500/60 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-orange-500 text-sm hover:text-orange-500 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden py-3 rounded-xl font-bold text-orange-500 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black animate-gradient-x" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Default Credentials Note */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-orange-500/60 text-xs text-center">
              Demo Credentials:<br />
              Username: <span className="text-orange-500">admin</span><br />
              Password: <span className="text-orange-500">admin123</span>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="text-orange-500/60 hover:text-orange-500 transition-colors text-sm"
          >
            ← Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;