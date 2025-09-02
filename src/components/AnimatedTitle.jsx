import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedTitle.css';

// This variant makes the REVEALING cover shrink from left to right
const revealVariants = {
  hidden: { scaleX: 1 },
  visible: {
    scaleX: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// This variant will slide the text in from the right, slightly delayed
const textVariants = {
  hidden: { x: '101%' }, // Start just off-screen to the right
  visible: {
    x: '0%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

// This variant fades in the icon
const iconVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
  },
};

const AnimatedTitle = ({ title, icon: Icon }) => {
  return (
    <motion.div
      className="animated-title-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }} // Trigger when 60% is in view
    >
      {/* This is the FINAL colored background that will be revealed */}
      <div className="title-colored-background" />

      {/* This is the ANIMATING cover that hides the colored bg and then reveals it */}
      <motion.div className="title-reveal-cover" variants={revealVariants} />

      {/* The icon fades in */}
      <motion.div className="title-icon" variants={iconVariants}>
        {Icon && <Icon size={24} />}
      </motion.div>

      {/* Wrapper for the text to create the clipping mask for the slide-in effect */}
      <div className="title-text-wrapper">
        <motion.h2 className="title-text" variants={textVariants}>
          {title}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default AnimatedTitle;
