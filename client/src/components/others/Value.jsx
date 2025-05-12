import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoShieldCheckmark, IoTrendingUp, IoPricetag } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';

const accordionData = [
  {
    icon: IoShieldCheckmark,
    title: 'Best interest rates on the market',
    content: 'Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.'
  },
  {
    icon: IoTrendingUp,
    title: 'Prevent unstable prices',
    content: 'Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.'
  },
  {
    icon: IoPricetag,
    title: 'Best price on the market',
    content: 'Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat occaecat ut occaecat consequat est minim minim esse tempor laborum consequat esse adipisicing eu reprehenderit enim.'
  }
];

const AccordionItem = ({ item, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <item.icon className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-lg font-semibold text-navy-800">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoIosArrowDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 rounded-b-lg mt-1">
              <p className="text-gray-600">{item.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Value = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] overflow-hidden h-[500px]"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Modern house"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-orange-500 text-xl font-semibold mb-2">
                Our Value
              </h3>
              <h2 className="text-4xl font-bold text-navy-800 mb-4">
                Value We Give to You
              </h2>
              <p className="text-gray-600">
                We always ready to help by providing the best services for you.
                We believe a good place to live can make your life better.
              </p>
            </motion.div>

            <div>
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;