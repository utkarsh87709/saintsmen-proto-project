import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHelpCircle,
  FiUser,
  FiLogOut,
  FiHome,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiBell,
  FiUserCheck,
  FiShield,
  FiMapPin,
  FiSettings,
  FiClipboard
} from "react-icons/fi";
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

// Menu items with roles and proper icons
const menuItemsConfig = [
  { 
    name: "Dashboard", 
    icon: <FiHome />, 
    path: "/dashboard",
    roles: ["admin", "host"] 
  },
  { 
    name: "Manage Visitors", 
    icon: <FiUsers />, 
    path: "/vendor",
    roles: ["admin", "host"] 
  },
  { 
    name: "Request Visit", 
    icon: <FiUserCheck />, 
    path: "/request-visit",
    roles: ["client"] 
  },
  { 
    name: "Manage Users", 
    icon: <FiSettings />, 
    path: "/create-users",
    roles: ["admin"] 
  },
  { 
    name: "Premises Management", 
    icon: <FiShield />, 
    path: "/security",
    roles: ["security", "admin"] 
  },
  { 
    name: "My Visits", 
    icon: <FiClipboard />, 
    path: "/myvisits",
    roles: ["client"] 
  },
  { 
    name: "Calendar", 
    icon: <FiCalendar />, 
    path: "/calendar",
    roles: ["admin", "host"] 
  },
  { 
    name: "Profile", 
    icon: <FiUser />, 
    path: "/profile",
    roles: ["admin", "host", "client", "security"] // everyone
  },
  { 
    name: "Help", 
    icon: <FiHelpCircle />, 
    path: "/help",
    roles: ["admin", "host", "client", "security"] // everyone
  },
];

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user role from localStorage on component mount
  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    
    if (role) {
      // Filter menu items based on user role
      const filtered = menuItemsConfig.filter(item => 
        item.roles.includes(role.toLowerCase())
      );
      setFilteredMenuItems(filtered);
    } else {
      // If no role found, redirect to login or show minimal items
      console.warn("No user role found in localStorage");
      // Optional: Redirect to login
      // navigate('/login');
      
      // Show only public items as fallback
      setFilteredMenuItems(menuItemsConfig.filter(item => 
        item.roles.includes("client") // Default fallback
      ));
    }
  }, []);

  // Get user info from localStorage
  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || '';

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token'); // If you have token
    // Redirect to home/login
    navigate('/');
  };

  // Function to get role display name
  const getRoleDisplayName = (role) => {
    const roleMap = {
      'admin': 'Administrator',
      'host': 'Host',
      'client': 'Client',
      'security': 'Security Officer'
    };
    return roleMap[role] || role;
  };

  // Function to get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===================== SIDEBAR ===================== */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static w-64 border-r border-gray-200`}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Saintsmen Logo" 
              className="h-[76px] w-auto object-contain"
            />
          </div>

          {/* Close Button Mobile Only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* User Info */}
       

        {/* Navigation */}
        <nav className="mt-4 px-4 space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700"
                  }
                `}
              >
                <span className={`text-xl ${isActive ? "text-white" : "text-gray-600 group-hover:text-blue-600"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </Link>
            );
          })}

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 mt-8 text-red-600 hover:bg-red-50 rounded-xl w-full transition-all duration-200 group"
          >
            <FiLogOut className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs font-semibold text-blue-900 mb-1">Need Help?</p>
            <p className="text-xs text-blue-700">Contact support team</p>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT AREA ===================== */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* ===================== TOPBAR ===================== */}
        <header className="flex items-center justify-between px-4 py-4 bg-white shadow-sm border-b border-gray-200 md:px-6 sticky top-0 z-20">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Sidebar Toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>

            {/* Search */}
            <div className="hidden sm:flex items-center bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2.5 rounded-xl w-full max-w-md border border-gray-200 focus-within:border-blue-300 focus-within:shadow-md transition-all">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for vendor info"
                className="ml-3 bg-transparent outline-none w-full text-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Mobile Search Icon */}
            <button className="sm:hidden text-gray-700 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
              <FiSearch size={20} />
            </button>

            {/* Language Dropdown */}
            <div className="hidden md:block">
              <select className="border border-gray-200 px-3 py-2 rounded-xl text-sm bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer">
                <option>EN</option>
                <option>HI</option>
                <option>DE</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <FiBell className="text-xl text-gray-700" />
                <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-lg">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900">New vendor registered</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900">Calendar event reminder</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <p className="text-sm font-medium text-gray-900">Profile update completed</p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-semibold shadow-md">
                  {getUserInitials(userName)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="font-semibold text-sm text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{userRole ? getRoleDisplayName(userRole) : 'Loading...'}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <p className="font-semibold text-sm text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiUser className="inline mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ===================== PAGE CONTENT ===================== */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;