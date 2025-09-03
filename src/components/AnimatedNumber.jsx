import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

function AnimatedNumber({ value, className, isCurrency = true }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, damping: 60, stiffness: 400 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => 
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${isCurrency ? ' SAR' : ''}${Intl.NumberFormat('en-US').format(latest.toFixed(0))}`;
      }
    }),
    [springValue, isCurrency]);

  return <span ref={ref} className={className} />;
}

export default AnimatedNumber;
