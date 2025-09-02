import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedTitle.css';

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Time delay between each word
      delayChildren: 0.2,   // Delay before starting the animation
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const AnimatedTitle = ({ title, icon: Icon }) => {
  // Split title into words to animate them individually
  const words = title.split(' ');

  return (
    <motion.h2 
      className="animated-title-wrapper"
      variants={titleContainerVariants}
      initial="hidden"
      whileInView="visible" // Trigger animation when the component is in view
      viewport={{ once: true, amount: 0.5 }} // Animation triggers once when 50% is visible
    >
      {Icon && <Icon className="animated-title-icon" />}
      <div>
        {words.map((word, index) => (
          <motion.span 
            key={index} 
            className="word-wrapper"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.h2>
  );
};

export default AnimatedTitle;
