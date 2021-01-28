import React from "react";

const Navigation = ({onRouteChange,isSignIn}) => {
  return (
    isSignIn ? 
    <nav style={{display:"flex",justifyContent:"flex-end"}}>
      <p onClick={() => onRouteChange('signOut') } className="f3 dim link underline black pointer pa3">Sign Out</p>
    </nav>:
    <div>
      <nav style={{display:"flex",justifyContent:"flex-end"}}>
        <p onClick={() => onRouteChange('signIn') } className="f3 dim link underline black pointer pa3">Sign In</p>
        <p onClick={() => onRouteChange('register') } className="f3 dim link underline black pointer pa3">Register</p>
      </nav>
    </div>
  )
}

export default Navigation;