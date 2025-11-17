import React from 'react';
import { Hammer, Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';

const UnderConstruction = ({text}) => {
  return (
    <div className="max-h-screen bg-transparent flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center max-w-md w-full border border-blue-100"
      >
        <motion.div
           animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <Hourglass className="w-20 h-20 text-blue-500 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-bold text-blue-900 mb-3">
          {text}
        </h1>
        <p className="text-lg text-blue-900 mb-6">
          We're busy perfecting this page. Please check back soon!
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center text-blue-500 font-medium"
        >
        
         
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;