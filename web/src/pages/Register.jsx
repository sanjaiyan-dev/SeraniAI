import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/authApi'; // Updated path
import { useTheme } from '../context/ThemeContext';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/verify', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500 bg-blue-50 dark:bg-gray-950">
      
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-all duration-500">
        
        {/* LEFT SIDE - REGISTRATION FORM */}
        {/* Changed background and text colors for better contrast in light mode */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-[#E0E7FF] dark:bg-slate-800/50 transition-colors duration-500">
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Serani AI</h2>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Join us to balance productivity and well-being.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm mx-auto">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-slate-400 shadow-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="username@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-slate-400 shadow-sm"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-slate-400 shadow-sm"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F172A] dark:bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Social Register */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold mb-4">Or register with</p>
              <div className="flex justify-center gap-4">

  {/* Google */}
  <a
    href="http://localhost:7001/api/auth/google"
    className="p-3 rounded-full bg-white shadow-md hover:scale-110 transition duration-300"
  >
    <FcGoogle size={24} />
  </a>

  {/* GitHub */}
  <a
    href="http://localhost:7001/api/auth/github"
    className="p-3 rounded-full bg-white shadow-md hover:scale-110 transition duration-300"
  >
    <FaGithub size={24} className="text-black" />
  </a>

  {/* Facebook */}
  <a
    href="http://localhost:7001/api/auth/facebook"
    className="p-3 rounded-full bg-white shadow-md hover:scale-110 transition duration-300"
  >
    <FaFacebook size={24} className="text-blue-600" />
  </a>

</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-8">
              Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - BRANDING & TOGGLE */}
        <div className="hidden md:flex w-1/2 bg-white dark:bg-slate-900 flex-col items-center justify-center relative transition-colors duration-500 border-l border-slate-100 dark:border-slate-800">
          
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" 
            alt="Serani AI Robot" 
            className="w-72 h-72 object-contain mb-8 animate-bounce-slow"
          />
          
          <h1 className="text-5xl font-black text-slate-800 dark:text-white mb-3 transition-colors">Join SeraniAI</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium transition-colors">Start your journey today</p>
          
          {/* THEME TOGGLE PILL */}
          <div className="mt-10 flex bg-slate-200 dark:bg-slate-700 rounded-full p-1.5 shadow-inner">
            <button 
              onClick={() => toggleTheme('light')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${theme === 'light' ? 'bg-pink-500 text-white shadow-md transform scale-105' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Light mode
            </button>
            <button 
              onClick={() => toggleTheme('dark')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${theme === 'dark' ? 'bg-pink-500 text-white shadow-md transform scale-105' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Dark mode
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;