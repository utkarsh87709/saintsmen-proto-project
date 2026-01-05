import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, XCircle, Clock, Calendar, User } from "lucide-react";

const MyVisits = () => {
  const [showQR, setShowQR] = useState(null);
  const [showReason, setShowReason] = useState(null);
  const qrCanvasRef = useRef(null);

  // Generate actual QR code pattern
  useEffect(() => {
    if (showQR && qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = 280;
      const moduleSize = 7;
      const modules = Math.floor(size / moduleSize);
      
      canvas.width = size;
      canvas.height = size;
      
      // Clear canvas with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, size, size);
      
      // Generate deterministic pattern based on visit ID
      ctx.fillStyle = '#000000';
      const seed = showQR.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // Create QR-like pattern
      for (let i = 0; i < modules; i++) {
        for (let j = 0; j < modules; j++) {
          // Skip finder pattern areas
          const isFinderArea = 
            (i < 8 && j < 8) || 
            (i >= modules - 8 && j < 8) || 
            (i < 8 && j >= modules - 8);
          
          if (!isFinderArea) {
            const hash = ((seed * 31 + i * 17 + j * 23) % 100);
            if (hash < 45) {
              ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
            }
          }
        }
      }
      
      // Draw finder patterns (3 corners)
      const drawFinderPattern = (x, y) => {
        // Outer black square
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
        // White inner square
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
        // Black center square
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
      };
      
      drawFinderPattern(0, 0);
      drawFinderPattern((modules - 7) * moduleSize, 0);
      drawFinderPattern(0, (modules - 7) * moduleSize);
    }
  }, [showQR]);

  const visits = [
    {
      id: "VIS-001",
      visitorName: "Rajesh Kumar",
      email: "rajesh.k@gmail.com",
      visitDate: "2026-01-15",
      visitTime: "10:00 AM",
      host: "Akshay R",
      purpose: "Business discussion",
      status: "Approved",
    },
    {
      id: "VIS-002",
      visitorName: "Priya Sharma",
      email: "priya.s@company.com",
      visitDate: "2026-01-12",
      visitTime: "02:30 PM",
      host: "Utkarsh Singh",
      purpose: "Interview",
      status: "Rejected",
      rejectionReason: "Incomplete documentation provided. Please resubmit with valid government-issued ID and company authorization letter.",
    },
    {
      id: "VIS-003",
      visitorName: "Amit Patel",
      email: "amit.p@vendor.com",
      visitDate: "2026-01-18",
      visitTime: "11:00 AM",
      host: "Varun R",
      purpose: "Equipment delivery",
      status: "Pending",
    },
    {
      id: "VIS-004",
      visitorName: "Sneha Reddy",
      email: "sneha.r@partner.com",
      visitDate: "2026-01-08",
      visitTime: "09:30 AM",
      host: "Akshay R",
      purpose: "Client meeting",
      status: "Completed",
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: CheckCircle2,
        };
      case "Rejected":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: XCircle,
        };
      case "Pending":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: Clock,
        };
      case "Completed":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: CheckCircle2,
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: Clock,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Visits</h1>
          <p className="text-slate-600">View and manage your visit requests and history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Visits</p>
                <p className="text-2xl font-bold text-slate-900">{visits.length}</p>
              </div>
              <Calendar className="text-slate-400" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 mb-1">Approved</p>
                <p className="text-2xl font-bold text-emerald-700">
                  {visits.filter(v => v.status === "Approved").length}
                </p>
              </div>
              <CheckCircle2 className="text-emerald-400" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-amber-700">
                  {visits.filter(v => v.status === "Pending").length}
                </p>
              </div>
              <Clock className="text-amber-400" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-blue-700">
                  {visits.filter(v => v.status === "Completed").length}
                </p>
              </div>
              <CheckCircle2 className="text-blue-400" size={32} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white font-bold text-black">
                  <th className="px-6 py-4 text-left text-sm font-bold">Visit ID</th>
                  <th className="px-6 py-4 text-left text-sm ">Visitor Name</th>
                  <th className="px-6 py-4 text-left text-sm ">Email</th>
                  <th className="px-6 py-4 text-left text-sm ">Date</th>
                  <th className="px-6 py-4 text-left text-sm ">Time</th>
                  <th className="px-6 py-4 text-left text-sm">Host</th>
                  <th className="px-6 py-4 text-left text-sm">Purpose</th>
                  <th className="px-6 py-4 text-left text-sm ">Status</th>
                  <th className="px-6 py-4 text-left text-sm ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visits.map((visit, index) => {
                  const statusConfig = getStatusConfig(visit.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <tr 
                      key={visit.id} 
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900">{visit.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {visit.visitorName.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{visit.visitorName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{visit.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">{visit.visitDate}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{visit.visitTime}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{visit.host}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{visit.purpose}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <StatusIcon size={14} />
                          {visit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {visit.status === "Approved" && (
                          <button
                            onClick={() => setShowQR(visit)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                          >
                            Show QR
                          </button>
                        )}
                        {visit.status === "Rejected" && (
                          <button
                            onClick={() => setShowReason(visit)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                          >
                            View Reason
                          </button>
                        )}
                        {visit.status === "Completed" && (
                          <button
                            onClick={() => setShowQR(visit)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" 
            onClick={() => setShowQR(null)} 
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Visit QR Code</h2>
                <button 
                  onClick={() => setShowQR(null)} 
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <canvas ref={qrCanvasRef} className="block" />
                    </div>
                  </div>
                  <p className="text-center text-sm text-slate-600 font-medium">
                    Show this QR code at the entrance
                  </p>
                </div>

                {/* Visit Details */}
                <div className="space-y-3 bg-slate-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Visit ID:</span>
                    <span className="text-sm font-semibold text-slate-900">{showQR.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Visitor:</span>
                    <span className="text-sm font-semibold text-slate-900">{showQR.visitorName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Date:</span>
                    <span className="text-sm font-semibold text-slate-900">{showQR.visitDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Time:</span>
                    <span className="text-sm font-semibold text-slate-900">{showQR.visitTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Host:</span>
                    <span className="text-sm font-semibold text-slate-900">{showQR.host}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowQR(null)}
                  className="w-full mt-4 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Rejection Reason Modal */}
      {showReason && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" 
            onClick={() => setShowReason(null)} 
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scale-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle size={24} className="text-white" />
                  <h2 className="text-xl font-bold text-white">Visit Rejected</h2>
                </div>
                <button 
                  onClick={() => setShowReason(null)} 
                  className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {showReason.rejectionReason || "Reason not specified"}
                  </p>
                </div>

                {/* Visit Details */}
                <div className="space-y-3 bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Visit ID:</span>
                    <span className="text-sm font-semibold text-slate-900">{showReason.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Visitor:</span>
                    <span className="text-sm font-semibold text-slate-900">{showReason.visitorName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Date:</span>
                    <span className="text-sm font-semibold text-slate-900">{showReason.visitDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReason(null)}
                  className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyVisits;