import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: 'center',
        background: '#182021',
        color: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '2%',
        fontSize: '1.2rem',
        letterSpacing: '0.1rem',
      }}
    >
      <p>
        Applicate &copy; 2023
        <br />
        <br />
        Created by jsb-dev
        <br />
        <br />
        jsb-dev@outlook.com
      </p>
    </footer>
  );
};

export default Footer;
