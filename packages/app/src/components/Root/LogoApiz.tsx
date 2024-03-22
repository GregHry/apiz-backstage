import React from 'react';
import logoAudaxis from '../../assets/logo-apiz.fix.svg';

const LogoApiz = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: '0 auto 0 83px' }}>
      <img src={logoAudaxis} alt="Custom Logo" style={{ width: "120px", height: "80px" }} /> 
    </div>
  );
};

export default LogoApiz;
