import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy visitor data
  const visitorData = {
    '2025-03-01': [{ id: '03', type: 'approved', name: 'Balwinder Singh', time: '10:00am - 11:00am' }],
    '2025-03-02': [{ id: '01', type: 'pending', name: 'Rahul Mehta', time: '11:00am - 12:00pm' }],
    '2025-03-03': [
      { id: '02', type: 'cancelled', name: 'Priya Sharma', time: '2:00pm - 3:00pm' },
      { id: '03', type: 'approved', name: 'Amit Kumar', time: '3:30pm - 4:30pm' }
    ],
    '2025-03-04': [
      { id: '02', type: 'cancelled', name: 'Sneha Patel', time: '9:00am - 10:00am' },
      { id: '03', type: 'approved', name: 'Vikram Singh', time: '1:00pm - 2:00pm' }
    ],
    '2025-03-05': [
      { id: '01', type: 'pending', name: 'Anjali Verma', time: '10:30am - 11:30am' },
      { id: '02', type: 'cancelled', name: 'Rajesh Gupta', time: '2:00pm - 3:00pm' },
      { id: '03', type: 'approved', name: 'Deepak Yadav', time: '4:00pm - 5:00pm' }
    ],
    '2025-03-06': [
      { id: '03', type: 'approved', name: 'Sanjay Mishra', time: '11:00am - 12:00pm' }
    ],
    '2025-03-07': [
      { id: '02', type: 'cancelled', name: 'Meera Joshi', time: '9:30am - 10:30am' },
      { id: '03', type: 'approved', name: 'Karan Malhotra', time: '3:00pm - 4:00pm' }
    ],
    '2025-03-09': [
      { id: '01', type: 'pending', name: 'Pooja Reddy', time: '10:00am - 11:00am' },
      { id: '02', type: 'cancelled', name: 'Arjun Nair', time: '1:00pm - 2:00pm' },
      { id: '03', type: 'approved', name: 'Divya Kapoor', time: '3:30pm - 4:30pm' }
    ],
    '2025-03-10': [
      { id: '01', type: 'pending', name: 'Balwinder Singh', time: '10:00am - 11:00am' },
      { id: '02', type: 'cancelled', name: 'Suresh Iyer', time: '11:30am - 12:30pm' },
      { id: '03', type: 'approved', name: 'Neha Bose', time: '2:00pm - 3:00pm' }
    ],
    '2025-03-12': [
      { id: '02', type: 'cancelled', name: 'Aditya Sharma', time: '9:00am - 10:00am' },
      { id: '03', type: 'approved', name: 'Ritu Singh', time: '12:00pm - 1:00pm' }
    ],
    '2025-03-13': [
      { id: '01', type: 'pending', name: 'Manish Pandey', time: '10:30am - 11:30am' },
      { id: '03', type: 'approved', name: 'Kavita Das', time: '3:00pm - 4:00pm' }
    ],
    '2025-03-14': [
      { id: '01', type: 'pending', name: 'Rohit Desai', time: '11:00am - 12:00pm' },
      { id: '02', type: 'cancelled', name: 'Sunita Rao', time: '2:30pm - 3:30pm' }
    ],
    '2025-03-15': [
      { id: '03', type: 'approved', name: 'Balwinder Singh', time: '10:00am - 11:00am' }
    ],
    '2025-03-16': [
      { id: '02', type: 'cancelled', name: 'Prakash Jain', time: '1:00pm - 2:00pm' },
      { id: '03', type: 'approved', name: 'Geeta Menon', time: '3:30pm - 4:30pm' }
    ],
    '2025-03-18': [
      { id: '01', type: 'pending', name: 'Ashok Kumar', time: '9:30am - 10:30am' },
      { id: '02', type: 'cancelled', name: 'Lakshmi Pillai', time: '11:00am - 12:00pm' },
      { id: '03', type: 'approved', name: 'Vijay Chopra', time: '2:00pm - 3:00pm' }
    ],
    '2025-03-19': [
      { id: '01', type: 'pending', name: 'Balwinder Singh', time: '10:00am - 11:00am' },
      { id: '02', type: 'cancelled', name: 'Nisha Agarwal', time: '12:30pm - 1:30pm' },
      { id: '03', type: 'approved', name: 'Ramesh Sinha', time: '3:00pm - 4:00pm' }
    ],
    '2025-03-21': [
      { id: '01', type: 'pending', name: 'Shalini Tiwari', time: '11:00am - 12:00pm' },
      { id: '03', type: 'approved', name: 'Harsh Saxena', time: '2:30pm - 3:30pm' }
    ],
    '2025-03-23': [
      { id: '01', type: 'pending', name: 'Alok Bhatt', time: '10:00am - 11:00am' },
      { id: '03', type: 'approved', name: 'Preeti Khanna', time: '1:00pm - 2:00pm' }
    ],
    '2025-03-24': [
      { id: '02', type: 'cancelled', name: 'Mukesh Dubey', time: '9:00am - 10:00am' },
      { id: '03', type: 'approved', name: 'Swati Bansal', time: '3:00pm - 4:00pm' }
    ],
    '2025-03-26': [
      { id: '01', type: 'pending', name: 'Nitin Choudhary', time: '10:30am - 11:30am' },
      { id: '02', type: 'cancelled', name: 'Anita Roy', time: '12:00pm - 1:00pm' },
      { id: '03', type: 'approved', name: 'Gaurav Sethi', time: '2:30pm - 3:30pm' }
    ],
    '2025-03-29': [
      { id: '01', type: 'pending', name: 'Balwinder Singh', time: '10:00am - 11:00am' },
      { id: '03', type: 'approved', name: 'Monika Arora', time: '2:00pm - 3:00pm' }
    ],
    '2025-03-30': [
      { id: '02', type: 'cancelled', name: 'Sunil Bharti', time: '11:00am - 12:00pm' },
      { id: '03', type: 'approved', name: 'Pallavi Ghosh', time: '3:30pm - 4:30pm' }
    ]
  };

  const upcomingVisitors = [
    { name: 'Balwinder Singh', time: '10:00am - 11:00am', date: 'Mar 10, 2025', department: 'Transformer Plant' },
    { name: 'Balwinder Singh', time: '10:00am - 11:00am', date: 'Mar 10, 2025', department: 'Transformer Plant' },
    { name: 'Balwinder Singh', time: '10:00am - 11:00am', date: 'Mar 10, 2025', department: 'Transformer Plant' }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'pending': return 'bg-yellow-200 text-yellow-900';
      case 'approved': return 'bg-emerald-200 text-emerald-900';
      case 'cancelled': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const visitors = visitorData[dateStr];
    if (visitors) {
      setSelectedDate({ day, visitors, dateStr });
      setShowModal(true);
    }
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
  
  for (let i = adjustedStartDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      isPrevMonth: true
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    calendarDays.push({
      day,
      isCurrentMonth: true,
      visitors: visitorData[dateStr] || []
    });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isNextMonth: true
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Calendar</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevMonth}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextMonth}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </motion.button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs md:text-sm font-semibold text-slate-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {calendarDays.map((dayInfo, index) => {
                const isToday = dayInfo.isCurrentMonth && 
                  dayInfo.day === new Date().getDate() && 
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo.day)}
                    className={`
                      min-h-[60px] md:min-h-[80px] p-1 md:p-2 rounded-lg border transition-all
                      ${dayInfo.isCurrentMonth 
                        ? 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer hover:shadow-md' 
                        : 'bg-slate-50 border-slate-100 text-slate-400'
                      }
                      ${isToday ? 'ring-2 ring-indigo-500' : ''}
                    `}
                  >
                    <div className={`text-xs md:text-sm font-medium mb-1 ${dayInfo.isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>
                      {dayInfo.day}
                    </div>
                    <div className="space-y-0.5">
                      {dayInfo.visitors && dayInfo.visitors.slice(0, 3).map((visitor, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className={`text-[8px] md:text-[10px] px-1 py-0.5 rounded font-semibold ${getTypeColor(visitor.type)}`}
                        >
                          {visitor.id}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming Visitors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming</h2>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Today</h3>
              <div className="space-y-3">
                {upcomingVisitors.map((visitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="bg-emerald-100 rounded-lg p-3 cursor-pointer hover:bg-emerald-200 transition-colors"
                  >
                    <h4 className="font-semibold text-slate-900 text-sm">{visitor.name}</h4>
                    <p className="text-xs text-slate-600 mt-1">{visitor.time}</p>
                    <p className="text-xs text-slate-500 mt-1">{visitor.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Tomorrow</h3>
              <p className="text-xs text-slate-500">No visitors scheduled</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-2xl z-50 p-6 mx-4"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {monthNames[currentDate.getMonth()]} {selectedDate.day}, {currentDate.getFullYear()}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{selectedDate.visitors.length} visitor(s) scheduled</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedDate.visitors.map((visitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{visitor.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{visitor.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(visitor.type)}`}>
                        {visitor.type.charAt(0).toUpperCase() + visitor.type.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-500">Department</p>
                        <p className="font-medium text-slate-900">Transformer Plant</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Purpose</p>
                        <p className="font-medium text-slate-900">Office Works</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ID Number</p>
                        <p className="font-medium text-slate-900">DL01-123456789</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Contact</p>
                        <p className="font-medium text-slate-900">+91 9999-999999</p>
                      </div>
                    </div>
                    {visitor.type === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                          Approve
                        </button>
                        <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;