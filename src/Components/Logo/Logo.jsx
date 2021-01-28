import React from "react";
import Tilt from 'react-tilt'
import './Logo.css';
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br3 shadow-2 logo" options={{max:55}} style={{height:"150px", width:"150px"}}>
        <div className="Tilt-inner">
          <img src={require('./brain.png')}  alt="logo"/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;