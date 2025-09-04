import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './RiyadhMap.css';

const RiyadhMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const mapContainerRef = useRef(null);

  // Updated with more complex, conceptual SVG paths for Riyadh regions
  const regions = [
    { id: 'north', name: 'شمال الرياض', d: 'M300 50 L500 50 L520 180 L450 220 L380 200 L280 150 Z' }, // More irregular north shape
    { id: 'south', name: 'جنوب الرياض', d: 'M300 550 L500 550 L520 420 L450 380 L380 400 L280 450 Z' }, // More irregular south shape
    { id: 'east', name: 'شرق الرياض', d: 'M550 200 L700 150 L750 300 L700 450 L550 400 L580 300 Z' }, // More irregular east shape
    { id: 'west', name: 'غرب الرياض', d: 'M100 150 L250 200 L220 300 L250 400 L100 450 L80 300 Z' }, // More irregular west shape
    { id: 'center', name: 'وسط الرياض', d: 'M350 250 L450 250 L480 320 L420 350 L380 330 L320 280 Z' }, // More irregular center shape
  ];

  const handleMouseEnter = (regionName) => {
    setHoveredRegion(regionName);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const handleClick = (regionName) => {
    setSelectedRegion(regionName === selectedRegion ? null : regionName);
    console.log('Selected region:', regionName);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        // Adjust tooltip position slightly to be next to the cursor, not exactly on it
        const x = event.clientX - rect.left + 15; // +15px offset
        const y = event.clientY - rect.top - 20;  // -20px offset (above cursor)
        mapContainerRef.current.style.setProperty('--mouse-x', `${x}px`);
        mapContainerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const currentMapRef = mapContainerRef.current;
    if (currentMapRef) {
      currentMapRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentMapRef) {
        currentMapRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div 
      className="riyadh-map-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={mapContainerRef}
    >
      <h3 className="map-title"><MapPin size={24} /> اختيار المنطقة الأنسب بالموقع</h3>
      <div className="map-svg-wrapper">
        <svg viewBox="0 0 800 600" className="riyadh-map-svg">
          {regions.map((region) => (
            <motion.path
              key={region.id}
              d={region.d}
              className={`map-region ${selectedRegion === region.name ? 'selected' : ''}`}
              onMouseEnter={() => handleMouseEnter(region.name)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(region.name)}
              whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.98 }}
            />
          ))}
        </svg>
        <AnimatePresence>
          {hoveredRegion && (
            <motion.div 
              className="region-hover-tooltip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {hoveredRegion}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {selectedRegion && (
        <div className="selected-region-info">
          المنطقة المختارة: <strong>{selectedRegion}</strong>
        </div>
      )}
      {!selectedRegion && (
        <div className="selected-region-info placeholder">
          الرجاء اختيار منطقة من الخريطة.
        </div>
      )}
    </motion.div>
  );
};

export default RiyadhMap;