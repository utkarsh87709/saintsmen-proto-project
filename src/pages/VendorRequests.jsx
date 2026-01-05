import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Clock, Building2, FileText, Upload, Camera, Smartphone, X, CheckCircle, Eye, Check, XCircle, Search, Filter } from "lucide-react";

const VisitorManagementSystem = () => {
  const [activeView, setActiveView] = useState("form"); // "form" or "dashboard"
  const [activeTab, setActiveTab] = useState("pending");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [visitors, setVisitors] = useState([
    // Pending visitors
    { id: 1, name: "Rahul Sharma", date: "2026-01-06", time: "10:00", host: "Akshay R", purpose: "Business Meeting", device: "Laptop", status: "pending", email: "rahul.sharma@email.com" },
    { id: 2, name: "Priya Patel", date: "2026-01-06", time: "11:30", host: "Utkarsh Singh", purpose: "Interview", device: "None", status: "pending", email: "priya.patel@email.com" },
    { id: 3, name: "Amit Kumar", date: "2026-01-07", time: "09:00", host: "Varun R", purpose: "Vendor Meeting", device: "Tablet", status: "pending", email: "amit.kumar@email.com" },
    { id: 4, name: "Sneha Reddy", date: "2026-01-07", time: "14:00", host: "Pratith K", purpose: "Client Demo", device: "Phone", status: "pending", email: "sneha.reddy@email.com" },
    { id: 5, name: "Vikram Singh", date: "2026-01-08", time: "10:30", host: "Akshay R", purpose: "Consultation", device: "Laptop", status: "pending", email: "vikram.singh@email.com" },
    { id: 6, name: "Ananya Iyer", date: "2026-01-08", time: "15:00", host: "Utkarsh Singh", purpose: "Training Session", device: "None", status: "pending", email: "ananya.iyer@email.com" },
    { id: 7, name: "Karthik Menon", date: "2026-01-09", time: "11:00", host: "Varun R", purpose: "Project Discussion", device: "Laptop", status: "pending", email: "karthik.menon@email.com" },
    
    // Approved visitors
    { id: 8, name: "Deepika Nair", date: "2026-01-05", time: "09:30", host: "Pratith K", purpose: "Partnership Meeting", device: "Phone", status: "approved", email: "deepika.nair@email.com", qrCode: "QR-2026-008" },
    { id: 9, name: "Rajesh Gupta", date: "2026-01-05", time: "13:00", host: "Akshay R", purpose: "Technical Support", device: "Laptop", status: "approved", email: "rajesh.gupta@email.com", qrCode: "QR-2026-009" },
    { id: 10, name: "Meera Krishnan", date: "2026-01-04", time: "10:00", host: "Utkarsh Singh", purpose: "Annual Review", device: "Tablet", status: "approved", email: "meera.krishnan@email.com", qrCode: "QR-2026-010" },
    { id: 11, name: "Arjun Verma", date: "2026-01-04", time: "14:30", host: "Varun R", purpose: "Product Launch", device: "Phone", status: "approved", email: "arjun.verma@email.com", qrCode: "QR-2026-011" },
    { id: 12, name: "Pooja Desai", date: "2026-01-03", time: "11:00", host: "Pratith K", purpose: "Compliance Check", device: "None", status: "approved", email: "pooja.desai@email.com", qrCode: "QR-2026-012" },
    { id: 13, name: "Sanjay Rao", date: "2026-01-03", time: "16:00", host: "Akshay R", purpose: "Investment Discussion", device: "Laptop", status: "approved", email: "sanjay.rao@email.com", qrCode: "QR-2026-013" },
    { id: 14, name: "Kavya Pillai", date: "2026-01-02", time: "09:00", host: "Utkarsh Singh", purpose: "Orientation", device: "Phone", status: "approved", email: "kavya.pillai@email.com", qrCode: "QR-2026-014" },
    
    // Rejected visitors
    { id: 15, name: "Rohit Agarwal", date: "2026-01-05", time: "12:00", host: "Varun R", purpose: "Sales Pitch", device: "Laptop", status: "rejected", email: "rohit.agarwal@email.com", rejectionReason: "Invalid government ID - document expired" },
    { id: 16, name: "Divya Bhat", date: "2026-01-04", time: "15:30", host: "Pratith K", purpose: "Partnership", device: "Phone", status: "rejected", email: "divya.bhat@email.com", rejectionReason: "Host unavailable on requested date" },
    { id: 17, name: "Nikhil Joshi", date: "2026-01-04", time: "10:30", host: "Akshay R", purpose: "Marketing", device: "None", status: "rejected", email: "nikhil.joshi@email.com", rejectionReason: "Insufficient documentation provided" },
    { id: 18, name: "Shreya Chatterjee", date: "2026-01-03", time: "13:30", host: "Utkarsh Singh", purpose: "Survey", device: "Tablet", status: "rejected", email: "shreya.chatterjee@email.com", rejectionReason: "Purpose does not align with company policy" },
    { id: 19, name: "Aditya Malhotra", date: "2026-01-03", time: "11:30", host: "Varun R", purpose: "Collaboration", device: "Laptop", status: "rejected", email: "aditya.malhotra@email.com", rejectionReason: "Previous security violation on record" },
    { id: 20, name: "Nandini Kapoor", date: "2026-01-02", time: "14:00", host: "Pratith K", purpose: "Inquiry", device: "Phone", status: "rejected", email: "nandini.kapoor@email.com", rejectionReason: "Company ID verification failed" },
    { id: 21, name: "Vaibhav Sinha", date: "2026-01-02", time: "16:30", host: "Akshay R", purpose: "Recruitment", device: "None", status: "rejected", email: "vaibhav.sinha@email.com", rejectionReason: "Selfie photo does not match ID" },
  ]);

  const [formData, setFormData] = useState({
    visitorName: "",
    visitDate: "",
    visitTime: "",
    govtId: null,
    companyId: null,
    devicesCarried: false,
    deviceName: "",
    deviceImage: null,
    purpose: "",
    hostId: "",
    selfie: null,
  });

  const [verifiedDocs, setVerifiedDocs] = useState({
  govId: false,
  companyId: false,
  selfie: false,
  details: false,
});


  const [previews, setPreviews] = useState({
    govtId: null,
    companyId: null,
    selfie: null,
    deviceImage: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const hosts = [
    { id: "host1", name: "Akshay R" },
    { id: "host2", name: "Utkarsh Singh" },
    { id: "host3", name: "Varun R" },
    { id: "host4", name: "Pratith K" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      if (!checked) {
        setFormData(prev => ({ ...prev, deviceName: "", deviceImage: null }));
        setPreviews(prev => ({ ...prev, deviceImage: null }));
      }
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, [name]: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
    setPreviews({ ...previews, [fieldName]: null });
  };

  const handleSubmit = () => {
    if (!formData.visitorName || !formData.visitDate || !formData.visitTime || 
        !formData.hostId || !formData.purpose || !formData.govtId || !formData.selfie) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        visitorName: "",
        visitDate: "",
        visitTime: "",
        govtId: null,
        companyId: null,
        devicesCarried: false,
        deviceName: "",
        deviceImage: null,
        purpose: "",
        hostId: "",
        selfie: null,
      });
      setPreviews({
        govtId: null,
        companyId: null,
        selfie: null,
        deviceImage: null,
      });
    }, 2000);
  };

  const handleVerifyDocuments = (visitor) => {
    setSelectedVisitor(visitor);
    setShowVerifyModal(true);
  };

  const handleApprove = () => {
    const qrCode = `QR-2026-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setVisitors(visitors.map(v => 
      v.id === selectedVisitor.id 
        ? { ...v, status: "approved", qrCode } 
        : v
    ));
    setShowVerifyModal(false);
    setShowQRModal(true);
  };

  const handleReject = (visitor) => {
    setSelectedVisitor(visitor);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    setVisitors(visitors.map(v => 
      v.id === selectedVisitor.id 
        ? { ...v, status: "rejected", rejectionReason } 
        : v
    ));
    setShowRejectModal(false);
    setRejectionReason("");
    setSelectedVisitor(null);
  };

  const ImageUploadBox = ({ name, label, icon: Icon, preview, required = false }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          name={name}
          onChange={handleChange}
          accept="image/*"
          className="hidden"
          id={name}
        />
        <label htmlFor={name} className="block cursor-pointer">
          {preview ? (
            <div className="relative group">
              <img
                src={preview}
                alt={label}
                className="w-full h-32 object-cover rounded-lg border-2 border-slate-200"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeImage(name);
                }}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-slate-100 rounded-full">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">Upload {label}</p>
                <p className="text-xs text-slate-500">Click to browse</p>
              </div>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  const filteredVisitors = visitors.filter(v => v.status === activeTab);

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-slate-900">Visitor Management</h1>
            
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8">
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex">
                  {["pending", "approved", "rejected"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
                        activeTab === tab
                          ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                        }`}>
                          {visitors.filter(v => v.status === tab).length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Host</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Device</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredVisitors.map((visitor, idx) => (
                      <motion.tr
                        key={visitor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {visitor.name.charAt(0)}
                            </div>
                            <div className="font-medium text-slate-900">{visitor.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{visitor.date}</div>
                          <div className="text-xs text-slate-500">{visitor.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{visitor.host}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate">{visitor.purpose}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{visitor.device}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(visitor.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {visitor.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleVerifyDocuments(visitor)}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-1 text-xs font-medium"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Verify
                              </button>
                              <button
                                onClick={() => handleReject(visitor)}
                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-1 text-xs font-medium"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </div>
                          )}
                          {visitor.status === "approved" && (
                            <div className="text-xs font-medium text-green-700">
                              QR: {visitor.qrCode}
                            </div>
                          )}
                          {visitor.status === "rejected" && (
                            <div className="text-xs text-red-600">
                              {visitor.rejectionReason}
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredVisitors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No {activeTab} visitors found</p>
                </div>
              )}
            </div>
          </motion.div>
       
      </div>

      {/* Verify Documents Modal */}
      <AnimatePresence>
        {showVerifyModal && (
         <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  onClick={() => setShowVerifyModal(false)}
>
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Eye className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">Verify Documents</h3>
      <p className="text-slate-600 text-sm">
        Review all documents for <strong>{selectedVisitor?.name}</strong>
      </p>
    </div>

    {/* Document Verification */}
    <div className="space-y-4 mb-6 bg-slate-50 rounded-lg p-4">
      {[
        { key: "govId", label: "Government ID" },
        { key: "companyId", label: "Company ID" },
        { key: "selfie", label: "Selfie matches ID photo" },
        { key: "details", label: "All details confirmed" },
      ].map((doc) => (
        <div
          key={doc.key}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2">
            <CheckCircle
              className={`w-4 h-4 transition ${
                verifiedDocs[doc.key]
                  ? "text-green-600"
                  : "text-slate-300"
              }`}
            />
            <span className="text-slate-700">{doc.label}</span>
          </div>

          <div className="flex gap-3 items-center">
            <button
              type="button"
              className="text-xs text-emerald-600 hover:underline"
            >
              View
            </button>

            <button
              type="button"
              onClick={() =>
                setVerifiedDocs((prev) => ({
                  ...prev,
                  [doc.key]: !prev[doc.key],
                }))
              }
              className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                verifiedDocs[doc.key]
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {verifiedDocs[doc.key] ? "Verified" : "Verify"}
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <button
        onClick={() => setShowVerifyModal(false)}
        className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
      >
        Cancel
      </button>

      {Object.values(verifiedDocs).every(Boolean) && (
        <button
          onClick={handleApprove}
          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Approve
        </button>
      )}
    </div>
  </motion.div>
</motion.div>

        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRejectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Reject Request</h3>
                <p className="text-slate-600 text-sm">
                  Please provide a reason for rejecting <strong>{selectedVisitor?.name}</strong>'s request
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Reason for Rejection <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter the reason for rejection..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason("");
                  }}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Success Modal */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Approved!</h3>
                <p className="text-slate-600 text-sm mb-6">
                  QR code has been generated and sent to<br />
                  <strong>{selectedVisitor?.email}</strong>
                </p>

                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                  <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-lg mx-auto flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📱</div>
                      <div className="text-xs font-mono text-slate-600">
                        {visitors.find(v => v.id === selectedVisitor?.id)?.qrCode}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowQRModal(false)}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitorManagementSystem;