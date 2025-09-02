import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>دراسة جدوى: مركز رعاية الأطفال</h3>
          <p>مشروع تجريبي يهدف إلى عرض دراسة جدوى متكاملة لمشروع مركز رعاية أطفال باستخدام تقنيات الويب الحديثة والتفاعلية.</p>
        </div>
        <div className="footer-social">
          <h4>تواصل معنا</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة. تم التطوير بواسطة Gemini.</p>
      </div>
    </footer>
  );
};

export default Footer;
