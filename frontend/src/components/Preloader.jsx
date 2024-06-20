import React from 'react';
import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader-dot"></div>
            <div className="preloader-dot"></div>
            <div className="preloader-dot"></div>
        </div>
    );
};

export default Preloader;