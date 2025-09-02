import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toLocaleString('ar-SA');
        }
      }
    });
    return () => controls.stop();
  }, [value]);

  return <span ref={ref} />;
};

export default AnimatedNumber;
