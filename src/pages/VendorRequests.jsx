import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Filter, X, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VendorRequests = () => {
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterVisitType, setFilterVisitType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Dummy vendor data
  const vendorRequests = [
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'Sep 2024',
      contact: '+91 9999-999999',
      status: 'Approved',
      host: 'Vikramjeet',
      location: 'Sector E',
      idNo: 'DL01-12345678909',
      visitTime: '2:30 PM',
      purpose: 'Goods Delivery',
      device: 'Laptop',
      photo: true
    },
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'May 2024',
      contact: '+91 9999-999999',
      status: 'Approved',
      host: 'Rajesh Kumar',
      location: 'Sector B',
      idNo: 'DL01-98765432101',
      visitTime: '10:00 AM',
      purpose: 'Equipment Installation',
      device: 'Tools',
      photo: true
    },
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'Nov 2024',
      contact: '+91 9999-999999',
      status: 'Rejected',
      host: 'Amit Sharma',
      location: 'Sector A',
      idNo: 'DL01-45678912345',
      visitTime: '3:00 PM',
      purpose: 'Maintenance Check',
      device: 'Tablet',
      photo: true
    },
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'Feb 2024',
      contact: '+91 9999-999999',
      status: 'Approved',
      host: 'Priya Patel',
      location: 'Sector D',
      idNo: 'DL01-78945612378',
      visitTime: '11:30 AM',
      purpose: 'Quality Inspection',
      device: 'Camera',
      photo: true
    },
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'Jul 2024',
      contact: '+91 9999-999999',
      status: 'Approved',
      host: 'Suresh Reddy',
      location: 'Sector C',
      idNo: 'DL01-32165498765',
      visitTime: '1:45 PM',
      purpose: 'Parts Delivery',
      device: 'Laptop',
      photo: true
    },
    {
      id: 'BRCK18409JHM',
      name: 'Balwinder Singh',
      department: 'Transformer Plant',
      month: 'Mar 2025',
      contact: '+91 9999-999999',
      status: 'New',
      host: 'Vikramjeet',
      location: 'Sector E',
      idNo: 'DL01-12345678909',
      visitTime: '2:30 PM',
      purpose: 'Goods Delivery',
      device: 'Laptop',
      photo: true
    },
    {
      id: 'BRCK18410KLM',
      name: 'Rajesh Kumar',
      department: 'Power Distribution',
      month: 'Jan 2024',
      contact: '+91 8888-888888',
      status: 'Approved',
      host: 'Deepak Singh',
      location: 'Sector F',
      idNo: 'DL01-55566677788',
      visitTime: '9:00 AM',
      purpose: 'System Upgrade',
      device: 'Laptop',
      photo: true
    },
    {
      id: 'BRCK18411NOP',
      name: 'Meera Joshi',
      department: 'Manufacturing Unit',
      month: 'Apr 2024',
      contact: '+91 7777-777777',
      status: 'Approved',
      host: 'Anil Verma',
      location: 'Sector G',
      idNo: 'DL01-99988877766',
      visitTime: '4:15 PM',
      purpose: 'Raw Material Delivery',
      device: 'None',
      photo: true
    },
    {
      id: 'BRCK18412QRS',
      name: 'Sunil Bharti',
      department: 'Logistics Department',
      month: 'Aug 2024',
      contact: '+91 6666-666666',
      status: 'Rejected',
      host: 'Kavita Das',
      location: 'Sector H',
      idNo: 'DL01-11122233344',
      visitTime: '12:00 PM',
      purpose: 'Transportation Review',
      device: 'Tablet',
      photo: true
    },
    {
      id: 'BRCK18413TUV',
      name: 'Anjali Verma',
      department: 'R&D Department',
      month: 'Oct 2024',
      contact: '+91 5555-555555',
      status: 'Approved',
      host: 'Rohit Desai',
      location: 'Sector I',
      idNo: 'DL01-44455566677',
      visitTime: '10:30 AM',
      purpose: 'Research Materials',
      device: 'Laptop',
      photo: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'New': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const resetFilters = () => {
    setFilterDate('');
    setFilterVisitType('');
    setFilterStatus('');
  };

  const filteredRequests = vendorRequests.filter(request => {
    if (filterStatus && request.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Vendor Requests</h1>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6"
        >
          <div className="flex flex-wrap gap-3 items-center">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200">
              <Filter className="w-4 h-4" />
              Filter By
            </button>
            
            <div className="relative">
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              >
                <option value="">Date</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={filterVisitType}
                onChange={(e) => setFilterVisitType(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              >
                <option value="">Visit Type</option>
                <option value="delivery">Delivery</option>
                <option value="maintenance">Maintenance</option>
                <option value="inspection">Inspection</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              >
                <option value="">Approval Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="New">New</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors ml-auto"
            >
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
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Month</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Contact No.</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredRequests.map((request, index) => (
                    <React.Fragment key={index}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.03 }}
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
                        <td className="py-4 px-6 text-sm text-slate-700">{request.month}</td>
                        <td className="py-4 px-6 text-sm text-slate-700">{request.contact}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                            {request.status === 'New' && (
                              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                                <Edit2 className="w-4 h-4 text-indigo-600" />
                              </button>
                            )}
                          </div>
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
                                <div className="w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
                                  {request.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 grid grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Visiting Host</p>
                                    <p className="text-sm font-semibold text-slate-900 underline">{request.host}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Department Location</p>
                                    <p className="text-sm font-semibold text-slate-900 underline">{request.location}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">ID NO</p>
                                    <p className="text-sm font-medium text-slate-900">{request.idNo}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Visiting Time</p>
                                    <p className="text-sm font-semibold text-slate-900 underline">{request.visitTime}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Purpose Of Visit</p>
                                    <p className="text-sm font-semibold text-slate-900 underline">{request.purpose}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Electronic Device</p>
                                    <p className="text-sm font-semibold text-slate-900 underline">{request.device}</p>
                                  </div>
                                </div>
                                {request.status === 'New' && (
                                  <div className="flex flex-col gap-2">
                                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap">
                                      Approve
                                    </button>
                                    <button className="px-6 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
                                      Reject
                                    </button>
                                  </div>
                                )}
                                {request.status === 'Approved' && (
                                  <span className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold self-start">
                                    Approved
                                  </span>
                                )}
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
            {filteredRequests.map((request, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-slate-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">ID</p>
                    <p className="text-sm font-medium text-slate-900 underline">{request.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    {request.status === 'New' && (
                      <button className="p-1.5 hover:bg-slate-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-indigo-600" />
                      </button>
                    )}
                  </div>
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
                    <p className="text-xs text-slate-500 mb-1">Month</p>
                    <p className="text-sm text-slate-700">{request.month}</p>
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
                      <div className="w-20 h-20 bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg mx-auto flex items-center justify-center text-white text-xl font-bold">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Host</p>
                          <p className="text-sm text-slate-700 underline">{request.host}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Location</p>
                          <p className="text-sm text-slate-700 underline">{request.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Time</p>
                          <p className="text-sm text-slate-700 underline">{request.visitTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Device</p>
                          <p className="text-sm text-slate-700 underline">{request.device}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-slate-500 mb-1">Purpose</p>
                          <p className="text-sm text-slate-700 underline">{request.purpose}</p>
                        </div>
                      </div>
                      {request.status === 'New' && (
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
                            Approve
                          </button>
                          <button className="flex-1 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-medium">
                            Reject
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-200 p-4 flex justify-between items-center">
            <span className="text-sm text-slate-600">Showing 1-{filteredRequests.length} of {vendorRequests.length}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VendorRequests;