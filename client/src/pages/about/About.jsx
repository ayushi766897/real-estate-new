import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const stats = [
  { icon: FiHome, value: '12K+', label: 'Properties Sold' },
  { icon: FiUsers, value: '18K+', label: 'Satisfied Clients' },
  { icon: FiAward, value: '25+', label: 'Years in Business' },
  { icon: FiTrendingUp, value: '98%', label: 'Success Rate' }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Your Premier Real Estate Ally
          </h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto">
            With over 25 years of expertise, we’ve guided countless families to their ideal homes 
            and turned real estate aspirations into realities.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="text-4xl font-semibold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-5">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              Founded by <strong>mps college</strong>  <strong></strong>, 
              crafted by <strong>gudiya & Team</strong> to deliver exceptional real estate services.
            </p>
            <p className="text-gray-700">
              Our passionate team is committed to making your property journey smooth, 
              efficient, and rewarding.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[450px] rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80" 
              alt="Contemporary real estate building"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-50 rounded-lg shadow-md p-10 md:p-14"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Trust',
                description: 'We uphold the highest ethical standards, ensuring transparency in every transaction.'
              },
              {
                title: 'Quality',
                description: 'We pursue excellence in service delivery, aiming for outstanding client experiences.'
              },
              {
                title: 'Progress',
                description: 'We leverage innovative tools and strategies to redefine real estate solutions.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.25 }}
                className="text-center"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-base">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;