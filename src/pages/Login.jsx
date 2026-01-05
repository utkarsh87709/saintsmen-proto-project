import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HostLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate=  useNavigate()

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,30}$/,
  };

  const getRoleByEmail = (email) => {
    const emailRoleMap = {
      "admin@saintsmen.com": "admin",
      "host@saintsmen.com": "host",
      "security@saintsmen.com": "security",
      "client@saintsmen.com": "client",
    };
    return emailRoleMap[email.toLowerCase()] || null;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let errs = {};

    if (!regex.email.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!regex.password.test(password)) {
      errs.password = "Password must be at least 6 characters";
    }

    const role = getRoleByEmail(email);
    if (!role) {
      errs.email = "Unauthorized email address";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    
      localStorage.setItem("role", role);
      console.log(role,'this is role')
      localStorage.setItem("email", email);
      localStorage.setItem("isAuthenticated", "true");
      setLoading(false);
      
      if(role=='admin'){
        navigate('/dashboard' )
      }
      else if(role=='client'){
        navigate('/request-visit' )
      }
      else if(role=='security'){
        navigate('/security' )
      }
      else if(role=='host'){
        navigate('/dashboard' )
      }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-20"></div>
        
        {/* Main card */}
        <div className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                  className="w-full pl-12 pr-4 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-pulse">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                  className="w-full pl-12 pr-12 py-3 bg-blue-50 border-2 border-blue-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-pulse">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all"
                />
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
              </label>
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Divider */}
      
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-full blur-2xl opacity-20"></div>
      </div>
    </div>
  );
};

export default HostLogin;