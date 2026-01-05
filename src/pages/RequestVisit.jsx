import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Calendar, Clock, Building2, FileText, Upload, Camera, Smartphone, X, CheckCircle } from "lucide-react";

const VisitorRequestForm = () => {
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
    // Validation
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
        <label
          htmlFor={name}
          className="block cursor-pointer"
        >
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mb-4"
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">New Visitor Request</h1>
          <p className="text-slate-600">Please fill in all the required information</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
        >
          <div className="space-y-6">
            {/* Visitor Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Visitor Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter visitor's full name"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Visit Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Visit Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="time"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Host Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Host <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <select
                  name="hostId"
                  value={formData.hostId}
                  onChange={handleChange}
                  className="w-full pl-11 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">Choose a host</option>
                  {hosts.map((host) => (
                    <option key={host.id} value={host.id}>
                      {host.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  placeholder="Briefly describe the purpose of your visit"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ImageUploadBox
                  name="govtId"
                  label="Government ID"
                  icon={FileText}
                  preview={previews.govtId}
                  required
                />
                <ImageUploadBox
                  name="companyId"
                  label="Company ID"
                  icon={Building2}
                  preview={previews.companyId}
                />
                <ImageUploadBox
                  name="selfie"
                  label="Selfie"
                  icon={Camera}
                  preview={previews.selfie}
                  required
                />
              </div>
            </div>

            {/* Device Checkbox */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="devicesCarried"
                  checked={formData.devicesCarried}
                  onChange={handleChange}
                  className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-700">Carrying Electronic Device?</span>
                </div>
              </label>
            </div>

            {/* Device Details */}
            {formData.devicesCarried && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-slate-900">Device Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Device Name
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g., Laptop, Phone, Tablet"
                      />
                    </div>
                  </div>
                  <ImageUploadBox
                    name="deviceImage"
                    label="Device Photo"
                    icon={Camera}
                    preview={previews.deviceImage}
                  />
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={submitted}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-md transition-all ${
                  submitted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Request Submitted Successfully!
                  </span>
                ) : (
                  "Submit Visitor Request"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-slate-500">
            All information will be verified by security personnel before approval
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VisitorRequestForm;