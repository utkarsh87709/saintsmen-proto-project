import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    section: "General",
    color: "from-blue-400 to-cyan-400",
    items: [
      {
        q: "What is the Visitor Management System?",
        a: "It is a digital platform that manages visitor entry from request submission to approval, verification, QR-based entry, and exit logging."
      },
      {
        q: "Who can access this system?",
        a: "The system supports Admin, Client, Host, and Security roles with strict role-based access control."
      }
    ]
  },
  {
    section: "Client",
    color: "from-indigo-400 to-blue-500",
    items: [
      {
        q: "What actions can a client perform?",
        a: "Clients can submit visit requests, upload documents, track request status, and download QR codes for approved visits."
      },
      {
        q: "What information is required while submitting a visit request?",
        a: "Visitor name, visit date and time, government ID, company ID, devices carried, purpose of visit, host details, and selfie for verification."
      }
    ]
  },
  {
    section: "Host",
    color: "from-sky-400 to-indigo-400",
    items: [
      {
        q: "What can a host do?",
        a: "Hosts can view visit requests addressed to them and approve or reject requests with a reason."
      },
      {
        q: "What happens after approval?",
        a: "A unique QR code is generated and shared with the client for secure entry."
      }
    ]
  },
  {
    section: "Security",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        q: "How does security verify a visitor?",
        a: "Security scans the QR code and matches the visitor’s live photo with the uploaded selfie. Manual verification is also supported."
      },
      {
        q: "Is visit time tracked?",
        a: "Yes, entry and exit timestamps are logged automatically for audit purposes."
      }
    ]
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-blue-700 text-center mb-10"
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="space-y-8">
        {faqData.map((section, sIdx) => (
          <div key={sIdx}>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              {section.section}
            </h2>

            <div className="space-y-4">
              {section.items.map((item, iIdx) => {
                const index = `${sIdx}-${iIdx}`;
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl bg-white shadow-xl border border-blue-100`}
                    style={{
                      boxShadow: "0 10px 30px rgba(59,130,246,0.25)"
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium text-blue-800">
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                      >
                        <ChevronDown className="text-blue-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`px-5 pb-5 text-black bg-opacity-5 rounded-b-xl`}
                        >
                          <p className="pt-2">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
