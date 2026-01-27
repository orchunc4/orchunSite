import React from 'react';

const Logo = ({ width = 60, height = 60 }) => {
    return (
        <img
            src="/logo_fixed.png"
            alt="Logo"
            style={{
                width: width,
                height: height,
                objectFit: 'contain',
                display: 'block'
            }}
        />
    );
};

export default Logo;
