import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './RiyadhMap.css';

const RiyadhMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Simplified, conceptual SVG paths for Riyadh regions
  // These are just rectangles to demonstrate functionality
  const regions = [
    { id: 'north', name: 'شمال الرياض', d: 'M300 100 L500 100 L500 200 L300 200 Z' },
    { id: 'south', name: 'جنوب الرياض', d: 'M300 400 L500 400 L500 500 L300 500 Z' },
    { id: 'east', name: 'شرق الرياض', d: 'M550 250 L700 250 L700 350 L550 350 Z' },
    { id: 'west', name: 'غرب الرياض', d: 'M100 250 L250 250 L250 350 L100 350 Z' },
    { id: 'center', name: 'وسط الرياض', d: 'M350 250 L450 250 L450 350 L350 350 Z' },
  ];

  const handleMouseEnter = (regionName) => {
    setHoveredRegion(regionName);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const handleClick = (regionName) => {
    setSelectedRegion(regionName === selectedRegion ? null : regionName);
    // You can add more logic here, e.g., pass the selected region to a parent component or update other parts of the UI
    console.log('Selected region:', regionName);
  };

  return (
    <motion.div 
      className="riyadh-map-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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