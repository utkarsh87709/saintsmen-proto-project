import React, { useState } from 'react';
import { Camera, Lock, User, Mail, Shield, Eye, EyeOff } from 'lucide-react';

export default function ProfileManagement() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [profilePic, setProfilePic] = useState(null);

const role=localStorage.getItem('role');
if(role=='admin'){
      var userData = {
    name: 'Akshay Raju',
    email: 'admin@saintsmen.com',
    role: 'Administrator'
  };
}
else if(role=='host'){
        var userData = {
    name: 'Varun Raju',
    email: 'host@saintsmen.com',
    role: 'Host'
  };
}
else if(role=='client'){
        var userData = {
    name: 'Utkarsh Singh',
    email: 'client@saintsmen.com',
    role: 'Client'
  };
} 
else if(role=='security'){
        var userData = {
    name: 'Pratith K',
    email: 'security@saintsmen.com',
    role: 'Security'
  };
}

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.new.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password updated successfully!');
    setShowPasswordModal(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Profile Management</h1>
            <p className="text-blue-100 mt-1">Manage your account settings and preferences</p>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {/* Profile Picture Section */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg transition-all hover:scale-110">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={userData.name}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Name cannot be edited</p>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be edited</p>
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={userData.role}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Role is assigned by administrator</p>
              </div>

              {/* Update Password Button */}
              <div className="pt-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Update Password</h2>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="Enter new password"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({ current: '', new: '', confirm: '' });
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}