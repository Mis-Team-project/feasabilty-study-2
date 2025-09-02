import React from 'react';
import './Cover.css';

// We will set the background image directly in Cover.css
const Cover = () => {
  return (
    <div className="cover-container">
      <div className="cover-overlay"></div>
      <div className="cover-content">
        <h1 className="cover-title">دراسة جدوى لحضانة ورياض أطفال بالرياض</h1>
        <p className="cover-subtitle">مركز الطفولة المبكرة: رعاية وتعليم مبتكر لصناع المستقبل</p>
      </div>
    </div>
  );
};

export default Cover;