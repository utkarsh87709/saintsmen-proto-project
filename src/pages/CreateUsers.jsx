import React, { useState } from 'react';
import { User, Plus, X, Mail, Lock, Shield, Upload, Camera, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageUsers = () => {
  const initialUsers = [
    {
      id: 1,
      name: 'Akshay R',
      email: 'admin@saintsmen.com',
      role: 'admin',
      image: null,
      isDefault: true
    },
    {
      id: 2,
      name: 'Utkarsh Singh',
      email: 'client@saintsmen.com',
      role: 'client',
      image: null,
      isDefault: true
    },
    {
      id: 3,
      name: 'Varun R',
      email: 'host@saintsmen.com',
      role: 'host',
      image: null,
      isDefault: true
    },
    {
      id: 4,
      name: 'Pratith K',
      email: 'security@saintsmen.com',
      role: 'security',
      image: null,
      isDefault: true
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });

  const getRoleConfig = (role) => {
    const configs = {
      admin: {
        label: 'Admin',
        roleColor: 'bg-purple-100 text-purple-700',
        iconColor: 'bg-gradient-to-br from-purple-400 to-purple-600'
      },
      client: {
        label: 'Client',
        roleColor: 'bg-blue-100 text-blue-700',
        iconColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
      },
      host: {
        label: 'Host',
        roleColor: 'bg-emerald-100 text-emerald-700',
        iconColor: 'bg-gradient-to-br from-emerald-400 to-emerald-600'
      },
      security: {
        label: 'Security',
        roleColor: 'bg-red-100 text-red-700',
        iconColor: 'bg-gradient-to-br from-red-400 to-red-600'
      }
    };
    return configs[role] || configs.client;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddForm = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'client'
    });
    setPreviewImage(null);
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setPreviewImage(user.image);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, image: previewImage }
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        image: previewImage,
        isDefault: false
      };
      setUsers([...users, newUser]);
    }

    setShowForm(false);
    setPreviewImage(null);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'client'
    });
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex-1 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddForm}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add User
            </motion.button>
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user, index) => {
                    const roleConfig = getRoleConfig(user.role);
                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${roleConfig.iconColor} rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden`}>
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs">{getInitials(user.name)}</span>
                              )}
                            </div>
                            <span className="font-medium text-slate-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${roleConfig.roleColor}`}>
                            <Shield className="w-3 h-3" />
                            {roleConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm text-emerald-600 font-medium">Active</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openEditForm(user)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Edit user"
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            {!user.isDefault && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowDeleteConfirm(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{users.length}</span> users
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="profile-upload" className="cursor-pointer block">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center overflow-hidden">
                            {previewImage ? (
                              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="w-10 h-10 text-white" />
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Click to upload profile picture</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="user@saintsmen.com"
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password {editingUser && '(leave blank to keep current)'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={editingUser ? "Enter new password" : "Enter password"}
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                      >
                        <option value="client">Client</option>
                        <option value="host">Host</option>
                        <option value="security">Security</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      {editingUser ? 'Save Changes' : 'Add User'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Delete User</h3>
                    <p className="text-sm text-slate-600">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">
                  Are you sure you want to delete this user? All of their data will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;