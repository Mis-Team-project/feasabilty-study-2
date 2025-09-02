import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedNumber = ({ value, format }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 20,
      });
    }
  }, [isInView, controls]);

  const count = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      const duration = 1000; // milliseconds
      const frameRate = 60; // frames per second
      const totalFrames = duration / (1000 / frameRate);
      let frame = 0;

      const startValue = 0;
      const endValue = value;

      intervalRef.current = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        if (progress < 1) {
          count.current = startValue + (endValue - startValue) * progress;
          ref.current.textContent = format(Math.round(count.current));
        } else {
          count.current = endValue;
          ref.current.textContent = format(endValue);
          clearInterval(intervalRef.current);
        }
      }, 1000 / frameRate);

      return () => clearInterval(intervalRef.current);
    } else {
      // Reset value when out of view, or just keep it at final if `once: true` means we don't re-animate.
      // For `once: true`, we might not need to reset visible content.
      if (ref.current) {
        ref.current.textContent = format(0);
      }
      clearInterval(intervalRef.current);
    }
  }, [isInView, value, format]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      style={{ display: 'inline-block' }}
    >
      {format(0)}
    </motion.span>
  );
};

export default AnimatedNumber;
