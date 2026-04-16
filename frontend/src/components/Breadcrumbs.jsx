import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeOutlined, MedicineBoxOutlined, HeartOutlined } from '@ant-design/icons';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map of paths to human-readable names
  const breadcrumbLabels = {
    'about': 'About Us',
    'products': 'Our Products',
    'services': 'Medical Services',
    'contact': 'Get In Touch',
  };

  if (location.pathname === '/' || pathnames.length === 0) return null;

  const currentPath = pathnames[pathnames.length - 1];
  const fullLabel = breadcrumbLabels[currentPath] || currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <div className="relative mb-12 flex flex-col items-center">
      
      {/* ──────────────────────────────────────
          MODERN MEDICAL WAVE BACKGROUND
         ────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1100,180 1150,120 1200,100 L1200,200 L0,200 Z" 
                fill="url(#waveGradient)" />
        </svg>
        <svg className="absolute top-0 right-0 w-1/2 opacity-5" viewBox="0 0 400 400">
          <circle cx="300" cy="200" r="150" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="300" cy="200" r="120" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="200" r="90" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="12 12" />
        </svg>
        <svg className="absolute bottom-10 left-0 w-64 opacity-5" viewBox="0 0 200 200">
          <path d="M20,180 L180,20" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="20" cy="20" r="4" fill="#3B82F6" />
          <circle cx="180" cy="180" r="4" fill="#3B82F6" />
          <circle cx="100" cy="100" r="6" fill="#06B6D4" />
        </svg>
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
        </defs>
      </svg>

      {/* ──────────────────────────────────────
          MAIN TITLE SECTION - MEDICAL STYLE
         ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative text-center"
      >
        <h1 className="relative text-4xl sm:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            {fullLabel}
          </span>
          {/* Animated Underline */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="absolute -bottom-4 left-1/2 h-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </h1>

        {/* Subtitle with Heart Icon */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500"
        >
          <HeartOutlined className="text-red-400 animate-pulse" />
          <span>Caring for your health journey</span>
          <HeartOutlined className="text-red-400 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* ──────────────────────────────────────
          CREATIVE BREADCRUMB TRAIL
         ────────────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-12"
      >
        {/* Connecting Line with Pulse Effect */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent">
          <motion.div 
            animate={{ 
              x: ["0%", "100%", "0%"],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500 blur-sm"
          />
        </div>

        <nav className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Breadcrumb">
          
          {/* Home Icon - Stylish Circle */}
          <Link
            to="/"
            className="group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-100/50 transition-all duration-300 hover:scale-110 hover:shadow-blue-200/80"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
            <HomeOutlined className="text-xl text-blue-600 transition-colors group-hover:text-blue-700" />
          </Link>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = breadcrumbLabels[value] || value.charAt(0).toUpperCase() + value.slice(1);

            return (
              <React.Fragment key={to}>
                
                {/* Stylish Arrow Separator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  className="flex items-center"
                >
                  <div className="relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.path 
                        d="M9 6L15 12L9 18" 
                        stroke="url(#titleGradient)" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Breadcrumb Item */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                >
                  {last ? (
                    // Active Page - Pill Style with Medical Icon
                    <div className="group relative">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
                      <div className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-white shadow-xl">
                        <MedicineBoxOutlined className="text-sm" />
                        <span className="text-sm font-bold tracking-wide">{label}</span>
                      </div>
                    </div>
                  ) : (
                    // Clickable Link - Glass Morphism Style
                    <Link
                      to={to}
                      className="group relative overflow-hidden rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-blue-600 hover:shadow-lg"
                    >
                      <span className="relative z-10">{label}</span>
                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 opacity-0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 group-hover:opacity-100"></div>
                    </Link>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
};

export default Breadcrumbs;