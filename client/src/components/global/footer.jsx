import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        padding: '3vh',
        height: '100%',
        display: 'flex',
      }}
    >
      <footer
        style={{
          textAlign: 'center',
          background: '#182021',
          color: 'white',
          width: '100%',
          fontSize: '8pt',
        }}
      >
        <p>Applicate &copy; 2023</p>
      </footer>
    </div>
  );
};

export default Footer;
