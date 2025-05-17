import React, { useState } from "react";

const SignInModal = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  
    return (
      <div className="auth-modal-overlay">
        <div className="auth-modal">
          <button className="auth-close" onClick={onClose}>&times;</button>
          <h2 className="auth-title">Welcome to NeKrisha</h2>
  
          <div className="auth-tabs">
            <button className={isSignIn ? "active" : ""} onClick={() => setIsSignIn(true)}>Sign in</button>
            <button className={!isSignIn ? "active" : ""} onClick={() => setIsSignIn(false)}>New account</button>
          </div>
  
          <form className="auth-form">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
  
            <label>Password</label>
            <input type="password" placeholder={isSignIn ? "Enter password" : "Create password"} />
  
            {!isSignIn && (
              <>
                <ul className="password-rules">
                  <li>At least 8 characters</li>
                  <li>Mix of letters and numbers</li>
                  <li>At least 1 special character</li>
                  <li>At least 1 lowercase letter and 1 uppercase letter</li>
                </ul>
  
              </>
            )}
  
            <button type="submit" className="auth-submit">{isSignIn ? "Sign in" : "Submit"}</button>
  
            {isSignIn && (
              <div className="auth-footer">
                <a href="#">Forgot your password?</a>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

export default SignInModal;
