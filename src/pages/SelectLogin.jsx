import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'

const SelectLogin = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHostLogin = () => {
    window.location.href = '/host-login';
  };

  const loginCards = [
    { id: 1, title: 'Visitor', subtitle: 'Guest Access', gradient: 'from-gray-200 to-gray-100', disabled: true },
    { id: 2, title: 'Host', subtitle: 'Employee Portal', gradient: 'from-blue-200 to-blue-100', disabled: false },
    { id: 3, title: 'Security', subtitle: 'Guard Station', gradient: 'from-gray-200 to-gray-100', disabled: true },
    { id: 4, title: 'Front Office', subtitle: 'Reception', gradient: 'from-gray-200 to-gray-100', disabled: true },
    { id: 5, title: 'Vendor', subtitle: 'Supplier Access', gradient: 'from-gray-200 to-gray-100', disabled: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-6">

      <div className="max-w-7xl w-full relative z-10">
        
        {/* Header replace this with logo */}
  {/* Header replaced with logo */}
<motion.div
  className="text-center mb-16 flex justify-center"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <img 
    src={logo} 
    alt="Logo" 
    className="w-40 md:w-48 lg:w-56 mx-auto"
  />
</motion.div>


        {/* Login Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loginCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={!card.disabled ? { scale: 1.02 } : {}}
              onHoverStart={() => !card.disabled && setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => !card.disabled && card.id === 2 && handleHostLogin()}
              className={`
                relative group p-[2px] rounded-2xl bg-gradient-to-br ${card.gradient}
                ${!card.disabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all">
                
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  {card.title}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-500 text-sm mb-6">{card.subtitle}</p>

                {/* Button */}
                <button
                  className={`w-full text-white font-medium py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition ${
                    card.disabled && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={card.disabled}
                >
                  {card.disabled ? 'Coming Soon' : 'Login →'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>A product by Saintsmen Systems • © 2025</p>
        </motion.div>

      </div>
    </div>
  );
};

export default SelectLogin;
