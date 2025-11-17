import React, { useState, useEffect } from 'react';
import { MapPin, Users, Clock, Navigation, AlertCircle, CheckCircle, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrackVisitor = () => {
  const [activeTab, setActiveTab] = useState('trackVisitor');
  const [currentLocation, setCurrentLocation] = useState(2);
  const [elapsedTime, setElapsedTime] = useState(420); // 7 minutes in seconds
  const [pulseKey, setPulseKey] = useState(0);

  // Simulate real-time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setPulseKey(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const locations = [
    { id: 1, name: 'Entry Gate', status: 'completed', time: '10:00 AM' },
    { id: 2, name: 'Front Office', status: 'completed', time: '10:05 AM' },
    { id: 3, name: 'Department Gate', status: 'active', deviation: '35m', time: 'In Progress' },
    { id: 4, name: 'Sector E', status: 'pending', time: 'Pending' }
  ];

  const visitorInfo = {
    name: 'Balwinder Singh',
    id: 'BRCK18409JHM',
    department: 'Transformer Plant',
    photo: true,
    distance: 439,
    duration: 7
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        {/* <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:w-64 bg-white border-r border-slate-200 p-4"
        >
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('securityCheck')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'securityCheck'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Security Check
            </button>
            <button
              onClick={() => setActiveTab('trackVisitor')}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'trackVisitor'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Track Visitor
            </button>
          </div>
        </motion.div> */}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Track Visitor</h1>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel - Visitor Info & Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Visitor Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xl font-bold">
                      BS
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{visitorInfo.name}</h3>
                      <p className="text-sm text-slate-600">Visitor ID: {visitorInfo.id}</p>
                      <p className="text-sm text-slate-600">Department: {visitorInfo.department}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <QrCode className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Live Tracking Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <motion.div
                        key={pulseKey}
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 left-0 w-3 h-3 bg-red-500 rounded-full"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-600">Live Tracking</h3>
                  </div>

                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex flex-col items-center">
                            <motion.div
                              animate={
                                location.status === 'active'
                                  ? { scale: [1, 1.2, 1] }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                location.status === 'completed'
                                  ? 'bg-emerald-500'
                                  : location.status === 'active'
                                  ? 'bg-red-500 shadow-lg shadow-red-500/50'
                                  : 'bg-slate-300'
                              }`}
                            >
                              {location.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : location.status === 'active' ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                  <Navigation className="w-4 h-4 text-white" />
                                </motion.div>
                              ) : (
                                <MapPin className="w-4 h-4 text-white" />
                              )}
                            </motion.div>
                            {index < locations.length - 1 && (
                              <div
                                className={`w-0.5 h-12 ${
                                  location.status === 'completed' || (location.status === 'active' && index < currentLocation)
                                    ? 'bg-emerald-500'
                                    : location.status === 'active'
                                    ? 'bg-gradient-to-b from-emerald-500 via-red-500 to-slate-300'
                                    : 'bg-slate-300'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`font-semibold ${
                                  location.status === 'active'
                                    ? 'text-red-600'
                                    : location.status === 'completed'
                                    ? 'text-slate-900'
                                    : 'text-slate-400'
                                }`}
                              >
                                {location.name}
                              </h4>
                              {location.status === 'active' && (
                                <motion.span
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="text-xs font-semibold text-red-600"
                                >
                                  LIVE
                                </motion.span>
                              )}
                            </div>
                            {location.deviation && (
                              <p className="text-sm text-red-600 mt-1">
                                Deviation: {location.deviation}
                              </p>
                            )}
                            <p className="text-xs text-slate-500 mt-1">{location.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Visitor</p>
                        <p className="text-lg font-bold text-slate-900">01</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Duration</p>
                        <motion.p
                          key={elapsedTime}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-bold text-slate-900"
                        >
                          {formatTime(elapsedTime)}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">Distance</span>
                    <span className="font-bold text-slate-900">{visitorInfo.distance} Meters</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full min-h-[600px] relative overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-slate-100">
                    <svg className="w-full h-full" viewBox="0 0 800 600">
                      {/* Street Grid */}
                      <g opacity="0.3">
                        {[...Array(20)].map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * 40}
                            x2="800"
                            y2={i * 40}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                          />
                        ))}
                        {[...Array(20)].map((_, i) => (
                          <line
                            key={`v-${i}`}
                            x1={i * 40}
                            y1="0"
                            x2={i * 40}
                            y2="600"
                            stroke="#cbd5e1"
                            strokeWidth="1"
                          />
                        ))}
                      </g>

                      {/* Building Blocks */}
                      <rect x="50" y="50" width="120" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="250" y="80" width="100" height="120" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="450" y="60" width="130" height="90" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="100" y="250" width="110" height="110" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="320" y="280" width="120" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="520" y="260" width="100" height="120" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="80" y="450" width="130" height="90" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="300" y="470" width="110" height="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="500" y="440" width="120" height="110" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

                      {/* Main Road */}
                      <rect x="0" y="380" width="800" height="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                      <line x1="0" y1="410" x2="800" y2="410" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="20,10" />

                      {/* Route Path */}
                      <motion.path
                        d="M 50 420 L 200 420 L 200 320 L 380 320 L 380 420 L 530 420"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="4"
                        strokeDasharray="10,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />

                      {/* Entry Gate - Start Point */}
                      <g>
                        <circle cx="50" cy="420" r="12" fill="#10b981" stroke="white" strokeWidth="3" />
                        <text x="50" y="455" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
                          Entry Gate
                        </text>
                      </g>

                      {/* Front Office */}
                      <g>
                        <circle cx="200" cy="320" r="12" fill="#10b981" stroke="white" strokeWidth="3" />
                        <text x="200" y="305" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
                          Front Office
                        </text>
                      </g>

                      {/* Current Location - Animated */}
                      <g>
                        <motion.circle
                          cx="380"
                          cy="420"
                          r="8"
                          fill="#ef4444"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.circle
                          cx="380"
                          cy="420"
                          r="20"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="3"
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <circle cx="380" cy="420" r="12" fill="#ef4444" stroke="white" strokeWidth="3" />
                        <text x="380" y="405" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                          Current Location
                        </text>
                      </g>

                      {/* Destination - Department Gate */}
                      <g>
                        <circle cx="530" cy="420" r="12" fill="#64748b" stroke="white" strokeWidth="3" />
                        <text x="530" y="455" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">
                          Department Gate
                        </text>
                      </g>

                      {/* Deviation Indicator */}
                      <motion.line
                        x1="380"
                        y1="420"
                        x2="380"
                        y2="350"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                      />
                      <motion.circle
                        cx="380"
                        cy="350"
                        r="6"
                        fill="#ef4444"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2.5 }}
                      />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 border border-slate-200 z-10">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Legend</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs text-slate-600">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full relative">
                          <motion.div
                            className="absolute inset-0 bg-red-500 rounded-full"
                            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">Current Position</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                        <span className="text-xs text-slate-600">Pending</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-indigo-500"></div>
                        <span className="text-xs text-slate-600">Route Path</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-bold">LIVE TRACKING</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackVisitor;