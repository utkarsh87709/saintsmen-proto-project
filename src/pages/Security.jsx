import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, Clock, User, QrCode, X, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VisitorManagement = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [showScanner, setShowScanner] = useState(false);
  const [scanningFor, setScanningFor] = useState(null);
  const [scanStep, setScanStep] = useState('qr'); // 'qr' or 'facial'
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate=useNavigate()

  // Dummy data for ongoing visits
  const [ongoingVisits, setOngoingVisits] = useState([
    { id: 1, name: 'John Doe', purpose: 'Meeting', inTime: new Date(Date.now() - 2 * 60 * 60 * 1000), company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', purpose: 'Interview', inTime: new Date(Date.now() - 1 * 60 * 60 * 1000), company: 'Design Co' },
    { id: 3, name: 'Mike Johnson', purpose: 'Delivery', inTime: new Date(Date.now() - 30 * 60 * 1000), company: 'Logistics Ltd' },
  ]);

  // Dummy data for expected visits
  const [expectedVisits, setExpectedVisits] = useState([
    { id: 4, name: 'Sarah Williams', purpose: 'Consultation', expectedTime: '2:00 PM', company: 'Marketing Inc', phone: '+91 98765 43210' },
    { id: 5, name: 'David Brown', purpose: 'Demo', expectedTime: '3:30 PM', company: 'Software Solutions', phone: '+91 98765 43211' },
    { id: 6, name: 'Emily Davis', purpose: 'Partnership Meeting', expectedTime: '4:00 PM', company: 'Business Partners', phone: '+91 98765 43212' },
  ]);

  // Dummy data for completed visits
  const [completedVisits, setCompletedVisits] = useState([
    { id: 101, name: 'Robert Wilson', purpose: 'Meeting', inTime: new Date(Date.now() - 5 * 60 * 60 * 1000), outTime: new Date(Date.now() - 4 * 60 * 60 * 1000), company: 'Finance Corp' },
    { id: 102, name: 'Lisa Anderson', purpose: 'Training', inTime: new Date(Date.now() - 7 * 60 * 60 * 1000), outTime: new Date(Date.now() - 6 * 60 * 60 * 1000), company: 'HR Solutions' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const calculateDuration = (inTime) => {
    const diff = currentTime - inTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const completeVisit = (id) => {
    const visit = ongoingVisits.find(v => v.id === id);
    if (visit) {
      setCompletedVisits([...completedVisits, { ...visit, outTime: new Date() }]);
      setOngoingVisits(ongoingVisits.filter(v => v.id !== id));
    }
  };

  const startCheckIn = (visitor) => {
    setScanningFor(visitor);
    setScanStep('qr');
    setShowScanner(true);
  };

  const handleQRScan = () => {
    // Simulate QR scan
    setTimeout(() => {
      setScanStep('facial');
    }, 1500);
  };

  const handleFacialRecognition = (success) => {
    if (success) {
      // Move visitor to ongoing
      const visitor = { ...scanningFor, inTime: new Date() };
      delete visitor.expectedTime;
      setOngoingVisits([...ongoingVisits, visitor]);
      setExpectedVisits(expectedVisits.filter(v => v.id !== scanningFor.id));
      setShowScanner(false);
      setScanningFor(null);
      setScanStep('qr');
    }
  };

  const manualCheckIn = () => {
    const visitor = { ...scanningFor, inTime: new Date() };
    delete visitor.expectedTime;
    setOngoingVisits([...ongoingVisits, visitor]);
    setExpectedVisits(expectedVisits.filter(v => v.id !== scanningFor.id));
    setShowScanner(false);
    setScanningFor(null);
    setScanStep('qr');
  };

  useEffect(() => {
    if (showScanner && scanStep === 'qr') {
      handleQRScan();
    }
  }, [showScanner, scanStep]);

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
  

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'ongoing'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Ongoing Visits ({ongoingVisits.length})
          </button>
          <button
            onClick={() => setActiveTab('expected')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'expected'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Expected Visits ({expectedVisits.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Completed Visits ({completedVisits.length})
          </button>
        </div>

        {/* Ongoing Visits */}
        {activeTab === 'ongoing' && (
          <div className="space-y-4">
            {ongoingVisits.map(visit => (
              <div key={visit.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="text-blue-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">{visit.name}</h3>
                    </div>
                    <p className="text-gray-600 ml-9">Company: {visit.company}</p>
                    <p className="text-gray-600 ml-9">Purpose: {visit.purpose}</p>
                    <div className="flex items-center gap-2 ml-9 mt-2">
                      <Clock className="text-green-600" size={16} />
                      <span className="text-sm font-semibold text-green-600">
                        In Time: {formatTime(visit.inTime)}
                      </span>
                    </div>
                    <div className="ml-9 mt-1">
                      <span className="text-lg font-bold text-blue-600">
                        Duration: {calculateDuration(visit.inTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>{navigate('/track-visitor')}} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Track Visitor
                    </button>
                    <button
                      onClick={() => completeVisit(visit.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Complete Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expected Visits */}
        {activeTab === 'expected' && (
          <div className="space-y-4">
            {expectedVisits.map(visit => (
              <div key={visit.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="text-orange-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">{visit.name}</h3>
                    </div>
                    <p className="text-gray-600 ml-9">Company: {visit.company}</p>
                    <p className="text-gray-600 ml-9">Purpose: {visit.purpose}</p>
                    <p className="text-gray-600 ml-9">Phone: {visit.phone}</p>
                    <div className="flex items-center gap-2 ml-9 mt-2">
                      <Clock className="text-orange-600" size={16} />
                      <span className="text-sm font-semibold text-orange-600">
                        Expected: {visit.expectedTime}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => startCheckIn(visit)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <QrCode size={18} />
                    Check In
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Visits */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedVisits.map(visit => (
              <div key={visit.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <UserCheck className="text-green-600" size={24} />
                      <h3 className="text-xl font-bold text-gray-800">{visit.name}</h3>
                    </div>
                    <p className="text-gray-600 ml-9">Company: {visit.company}</p>
                    <p className="text-gray-600 ml-9">Purpose: {visit.purpose}</p>
                    <div className="grid grid-cols-2 gap-4 ml-9 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">In Time</p>
                        <p className="font-semibold text-green-600">{formatTime(visit.inTime)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Out Time</p>
                        <p className="font-semibold text-red-600">{formatTime(visit.outTime)}</p>
                      </div>
                    </div>
                    <div className="ml-9 mt-2">
                      <p className="text-sm text-gray-500">Total Duration</p>
                      <p className="font-bold text-blue-600">
                        {Math.floor((visit.outTime - visit.inTime) / (1000 * 60))} minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Check In Visitor</h2>
                <button
                  onClick={() => {
                    setShowScanner(false);
                    setScanningFor(null);
                    setScanStep('qr');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {scanningFor && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-gray-800">{scanningFor.name}</p>
                  <p className="text-sm text-gray-600">{scanningFor.company}</p>
                </div>
              )}

              {scanStep === 'qr' && (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-8 mb-4 flex flex-col items-center">
                    <QrCode size={64} className="text-blue-600 animate-pulse mb-4" />
                    <p className="text-lg font-semibold text-gray-800">Scanning QR Code...</p>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {scanStep === 'facial' && (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-8 mb-4 flex flex-col items-center">
                    <Camera size={64} className="text-green-600 animate-pulse mb-4" />
                    <p className="text-lg font-semibold text-gray-800">Facial Recognition</p>
                    <p className="text-sm text-gray-600 mt-2">Please look at the camera</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleFacialRecognition(true)}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Recognition Success
                    </button>
                    <button
                      onClick={manualCheckIn}
                      className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                      Manual Bypass
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorManagement;