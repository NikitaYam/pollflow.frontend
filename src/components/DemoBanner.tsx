import React from 'react';

const DemoBanner: React.FC = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      padding: '15px 30px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      marginBottom: '0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1.2em' }}>🎭</span>
        <strong>DEMO MODE</strong>
        <span>•</span>
        <span style={{ opacity: 0.9 }}>
          No backend required • All data is mock
        </span>
        <span>•</span>
        <span style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '4px 12px', 
          borderRadius: '12px',
          fontSize: '0.9em'
        }}>
          Login: <strong>admin</strong> / Password: <strong>admin</strong>
        </span>
      </div>
    </div>
  );
};

export default DemoBanner;

