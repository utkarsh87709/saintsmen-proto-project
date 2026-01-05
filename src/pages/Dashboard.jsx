import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, MoreVertical, Filter, X, Calendar, Users, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // admin | host
  const [currentView, setCurrentView] = useState("dashboard");
  const [expandedRequest, setExpandedRequest] = useState(null);

  /* -------------------- Dummy Data -------------------- */
  const timeSlots = [
    "10:00am","10:30am","11:00am","11:30am","12:00am","12:30pm",
    "1:00pm","1:30pm","2:00pm","2:30pm","3:00pm","4:00pm",
    "4:30pm","5:30pm","6:00pm","6:30pm","7:30pm","8:00pm"
  ];

  const visitorRequests = [
    { id: 1, date: "Fri", day: 14, name: "Akshay Raju", location: "14 Jan 2026", time: "11:00 AM - 12:00 AM" },
    { id: 2, date: "Sat", day: 15, name: "Pratith K", location: "15 Jan 2026", time: "11:00 AM - 12:00 AM" }
  ];

  const documents = [
    { id: 1, name: "Akshay Raju", time: "Thu | 11:00 AM - 12:00PM" },
    { id: 2, name: "Pratith K", time: "Thu | 11:00 AM - 12:00PM" }
  ];

  const trackVisitors = [
        { id: 1, name: "Sandhya Reddy", location: "Transformer Plant", status: "Live", duration: "2 Hr", time: "Thu | 11:00 AM - 12:00PM", distance: "645m" },
    { id: 1, name: "Utkarsh Singh", location: "Transformer Plant", status: "Live", duration: "2 Hr", time: "Thu | 11:00 AM - 12:00PM", distance: "645m" }
  ];

  const allVisitorRequests = [
    { id: "BRCK18409JHM", name: "Balwinder Singh", department: "Transformer Plant", date: "04 Sep 2024", contact: "+91 9999-999999", status: "Approved" }
  ];

  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
    hover: { y: -8, transition: { duration: 0.3 } }
  };

  /* -------------------- VIEW: ALL REQUESTS -------------------- */
  if (currentView === "allRequests") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-100 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <button
              onClick={() => setCurrentView("dashboard")}
              className="p-2 rounded-lg bg-white shadow-lg shadow-purple-200/50 hover:shadow-purple-300/60 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Visitor Requests
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl shadow-purple-200/40 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allVisitorRequests.map((req, i) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-slate-100 hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-600">{req.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{req.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{req.department}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{req.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{req.contact}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* -------------------- MAIN DASHBOARD -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent"
        >
          {role === "admin" ? "Welcome Admin" : "Welcome Host"}
        </motion.h1>

        {/* ADMIN QUICK ACTIONS */}
        {role === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => navigate("/calendar")}
              className="bg-white p-6 rounded-2xl cursor-pointer shadow-xl shadow-blue-200/50 hover:shadow-blue-300/70 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-300/50">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Show Calendar</h3>
              <p className="text-sm text-slate-500 mt-1">Appointments</p>
            </motion.div>

            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => navigate("/create-users")}
              className="bg-white p-6 rounded-2xl cursor-pointer shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/70 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-300/50">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Manage Users</h3>
              <p className="text-sm text-slate-500 mt-1">User management</p>
            </motion.div>

            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => navigate("/security")}
              className="bg-white p-6 rounded-2xl cursor-pointer shadow-xl shadow-purple-200/50 hover:shadow-purple-300/70 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-300/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Premises</h3>
              <p className="text-sm text-slate-500 mt-1">Management</p>
            </motion.div>

            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => navigate("/track-visitor")}
              className="bg-white p-6 rounded-2xl cursor-pointer shadow-xl shadow-orange-200/50 hover:shadow-orange-300/70 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-300/50">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Track Visitors</h3>
              <p className="text-sm text-slate-500 mt-1">Real-time tracking</p>
            </motion.div>
          </div>
        )}

        {/* VISITOR REQUESTS (ADMIN + HOST) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-2xl shadow-indigo-200/40"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Visitor Requests
            </h2>
            <button
              onClick={() => setCurrentView("allRequests")}
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {visitorRequests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all shadow-md shadow-blue-200/30"
              >
                <div className="bg-white p-3 rounded-lg shadow-md shadow-blue-300/30">
                  <div className="text-sm text-slate-600">{req.date}</div>
                  <div className="text-2xl font-bold text-indigo-600">{req.day}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{req.name}</h3>
                  <p className="text-sm text-slate-600">{req.location} | {req.time}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* VISITOR DOCUMENTS (ADMIN + HOST) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-2xl shadow-purple-200/40"
        >
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Visitor Documents
          </h2>

          <div className="space-y-4">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all shadow-md shadow-purple-200/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-300/50">
                  <IoDocumentTextOutline className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                  <p className="text-sm text-slate-600">{doc.time}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TRACK VISITORS (ADMIN ONLY) */}
        {role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 shadow-2xl shadow-emerald-200/40"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Track Visitors
            </h2>

            <div className="space-y-4">
              {trackVisitors.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg shadow-emerald-200/40"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-300/50">
                      <FaUserAstronaut className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">{v.name}</h3>
                      <p className="text-sm text-slate-600">{v.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-lg shadow-red-300/50 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {v.status}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/track-visitor")}
                    className="mt-3 w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 rounded-xl font-medium shadow-xl shadow-slate-400/50 hover:shadow-slate-500/60 transition-all"
                  >
                    See Details
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;