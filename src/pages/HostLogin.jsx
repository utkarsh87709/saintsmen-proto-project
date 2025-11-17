import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiEye, FiEyeOff, FiRefreshCcw } from "react-icons/fi";

const HostLogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate captcha
  const generateCaptcha = () => {
    const text = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCaptcha(text);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,     // Basic email validation
    password: /^.{6,30}$/,                  // Min 6 chars
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let errs = {};

    if (!regex.email.test(email)) errs.email = "Invalid email address";
    if (!isValidPhoneNumber(phone)) errs.phone = "Invalid phone number";
    if (!regex.password.test(password)) errs.password = "Password must be at least 6 characters";
    if (captchaInput !== captcha) errs.captcha = "Captcha does not match";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Always allow login if valid
      window.location.href = "/dashboard";

    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-blue-100"
      >
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Host Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-gray-700 font-semibold">Email Address</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-700 font-semibold">Phone Number</label>
            <div className="mt-2 bg-white border border-gray-300 rounded-xl px-3 py-1">
              <PhoneInput
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
                international
                className="phone-input"
              />
            </div>
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-4 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Captcha */}
          <div>
            <label className="text-gray-700 font-semibold">Captcha</label>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 px-4 py-3 text-xl font-semibold tracking-widest text-blue-800 border bg-blue-50 rounded-xl shadow-inner select-none text-center">
                {captcha}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-3 rounded-xl bg-white border shadow hover:bg-blue-50"
              >
                <FiRefreshCcw className="text-blue-700" size={20} />
              </button>
            </div>

            <input
              className="w-full mt-3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              placeholder="Enter captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            {errors.captcha && <p className="text-red-600 text-sm mt-1">{errors.captcha}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl text-lg transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default HostLogin;
