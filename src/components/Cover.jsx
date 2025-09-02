import React from 'react';
import './Cover.css';
import coverImage from '../assets/cover-background.png';

const Cover = () => {
  return (
    <div className="cover-container">
      <img src={coverImage} alt="Cover" className="cover-image" />
      <div className="cover-overlay"></div>
      <div className="cover-content">
        <h1 className="cover-title">مركز الطفولة المبكرة</h1>
        <p className="cover-subtitle">رعاية وتعليم مبتكر لصناع المستقبل</p>
      </div>
    </div>
  );
};

export default Cover;