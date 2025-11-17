import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, MoreVertical, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaUserAstronaut } from "react-icons/fa";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedMonth, setSelectedMonth] = useState(2); // March 2025
  const [expandedRequest, setExpandedRequest] = useState(null);
  const navigate=useNavigate()

  // Dummy data
  const timeSlots = [
    '10:00am', '10:30am', '11:00am', '11:30am', '12:00am', '12:30pm',
    '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '4:00pm',
    '4:30pm', '5:30pm', '6:00pm', '6:30pm', '7:30pm', '8:00pm'
  ];

  const visitorRequests = [
    { id: 1, date: 'Fri', day: 14, name: 'Balwinder Singh', location: 'Transformer Plant', time: '11:00 AM - 12:00 AM' },
    { id: 2, date: 'Sat', day: 15, name: 'Balwinder Singh', location: 'Transformer Plant', time: '11:00 AM - 12:00 AM' },
    { id: 3, date: 'Sat', day: 15, name: 'Balwinder Singh', location: 'Transformer Plant', time: '11:00 AM - 12:00 AM' },
    { id: 4, date: 'Sat', day: 15, name: 'Balwinder Singh', location: 'Transformer Plant', time: '11:00 AM - 12:00 AM' }
  ];

  const documents = [
    { id: 1, name: 'Balwinder Singh', time: 'Thu | 11:00 AM - 12:00PM' },
    { id: 2, name: 'Balwinder Singh', time: 'Thu | 11:00 AM - 12:00PM' },
    { id: 3, name: 'Balwinder Singh', time: 'Thu | 11:00' }
  ];

  const trackVisitors = [
    { id: 1, name: 'Balwinder Singh', location: 'Transformer Plant', status: 'Live', duration: '2 Hr', time: 'Thu | 11:00 AM - 12:00PM', distance: '645m' },
    { id: 2, name: 'Balwinder Singh', location: 'Transformer Plant', status: 'Live', duration: '2 Hr', time: 'Thu | 11:00 AM - 12:00PM', distance: '645m' },
    { id: 3, name: 'Rahul Mehta', location: 'Transformer Plant', status: 'Live', duration: '2 Hr', time: 'Wed | 11:00 AM - 12:00PM', distance: '645m' }
  ];

  const allVisitorRequests = [
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '04 Sep 2024', contact: '+91 9999-999999', status: 'Approved', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' },
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '28 May 2024', contact: '+91 9999-999999', status: 'Approved', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' },
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '23 Nov 2024', contact: '+91 9999-999999', status: 'Rejected', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' },
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '05 Feb 2024', contact: '+91 9999-999999', status: 'Approved', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' },
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '29 Jul 2024', contact: '+91 9999-999999', status: 'Approved', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' },
    { id: 'BRCK18409JHM', name: 'Balwinder Singh', department: 'Transformer Plant', date: '10 Mar 2025', contact: '+91 9999-999999', status: 'New', host: 'Vikramjeet', location: 'Sector E', idNo: 'DL01-12345678909', visitTime: '2:30 PM', purpose: 'Office Works', device: 'Laptop' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'New': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (currentView === 'allRequests') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-6">
            {/* <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button> */}
            <h1 className="text-3xl font-bold text-slate-900">Visitor Requests</h1>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6"
          >
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                <Filter className="w-4 h-4" />
                Filter By
              </button>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                Date
              </button>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                Visit Type
              </button>
              <button className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                Approval Status
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors ml-auto">
                <X className="w-4 h-4" />
                Reset Filter
              </button>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">ID</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Name</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Visiting Department</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Date</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Contact No.</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {allVisitorRequests.map((request, index) => (
                      <React.Fragment key={index}>
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                          onClick={() => setExpandedRequest(expandedRequest === index ? null : index)}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: expandedRequest === index ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </motion.div>
                              <span className="text-sm font-medium text-slate-900 underline">{request.id}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-700">{request.name}</td>
                          <td className="py-4 px-6 text-sm text-slate-700">{request.department}</td>
                          <td className="py-4 px-6 text-sm text-slate-700">{request.date}</td>
                          <td className="py-4 px-6 text-sm text-slate-700">{request.contact}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                        </motion.tr>
                        <AnimatePresence>
                          {expandedRequest === index && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td colSpan="6" className="bg-slate-50">
                                <motion.div
                                  initial={{ y: -10 }}
                                  animate={{ y: 0 }}
                                  className="p-6 flex items-start gap-6"
                                >
                                  <div className="w-20 h-20 bg-slate-300 rounded-lg flex-shrink-0"></div>
                                  <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">Visiting Host</p>
                                      <p className="text-sm font-medium text-slate-900">{request.host}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">Department Location</p>
                                      <p className="text-sm font-medium text-slate-900">{request.location}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">ID NO</p>
                                      <p className="text-sm font-medium text-slate-900">{request.idNo}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">Visiting Time</p>
                                      <p className="text-sm font-medium text-slate-900">{request.visitTime}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">Purpose Of Visit</p>
                                      <p className="text-sm font-medium text-slate-900">{request.purpose}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 mb-1">Electronic Device</p>
                                      <p className="text-sm font-medium text-slate-900">{request.device}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                                      Approve
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                                      Reject
                                    </button>
                                  </div>
                                </motion.div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {allVisitorRequests.map((request, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-slate-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">ID</p>
                      <p className="text-sm font-medium text-slate-900">{request.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Name</p>
                    <p className="text-sm font-medium text-slate-900">{request.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Department</p>
                      <p className="text-sm text-slate-700">{request.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Date</p>
                      <p className="text-sm text-slate-700">{request.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedRequest(expandedRequest === index ? null : index)}
                    className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    {expandedRequest === index ? 'Hide Details' : 'View Details'}
                  </button>
                  <AnimatePresence>
                    {expandedRequest === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-3 border-t border-slate-200"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Host</p>
                            <p className="text-sm text-slate-700">{request.host}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Location</p>
                            <p className="text-sm text-slate-700">{request.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Time</p>
                            <p className="text-sm text-slate-700">{request.visitTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Device</p>
                            <p className="text-sm text-slate-700">{request.device}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
                            Approve
                          </button>
                          <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">
                            Reject
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="border-t border-slate-200 p-4 flex justify-between items-center">
              <span className="text-sm text-slate-600">Showing 1-09 of 78</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Time Slots */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Manage Time Slots</h2>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Today →</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {timeSlots.map((slot, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  ['11:00am', '11:30am', '12:00am', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '4:00pm'].includes(slot)
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {slot}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visitor Requests */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Visitor Request</h2>
              <button
                onClick={() => setCurrentView('allRequests')}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                View All →
              </button>
            </div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">March 2025</h3>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1 hover:bg-slate-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-1 hover:bg-slate-100 rounded">
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </motion.button>
              </div>
            </div>
            <div className="space-y-3">
              {visitorRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center bg-slate-100 rounded-lg p-2 min-w-[48px]">
                      <div className="text-xs text-slate-600 font-medium">{request.date}</div>
                      <div className="text-xl font-bold text-slate-900">{request.day}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{request.name}</h4>
                      <p className="text-sm text-slate-500">{request.location} | {request.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visitor Documents */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Visitor Documents</h2>
              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View All →</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  whileHover={{ y: -4 }}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <Star className="w-5 h-5 text-slate-300 hover:text-amber-400" />
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className=" rounded h-32 mb-3 flex items-center justify-center">
<IoDocumentTextOutline size={38} className='h-30 text-slate-500'/>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">{doc.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{doc.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Track Visitors */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Track Visitors</h2>
            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View All →</button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trackVisitors.map((visitor) => (
              <motion.div
                key={visitor.id}
                whileHover={{ y: -4 }}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-300 rounded-full flex-shrink-0 flex items-center justify-center">
                 <FaUserAstronaut size={18}/>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{visitor.name}</h4>
                    <p className="text-sm text-slate-500">{visitor.location}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full animate-pulse">
                      {visitor.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{visitor.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{visitor.distance}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{visitor.time}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  onClick={()=>navigate('/track-visitor')}
                >
                  See Details
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;