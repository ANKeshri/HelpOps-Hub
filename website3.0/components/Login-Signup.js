"use client";

import React,{useState} from 'react';
import "@stylesheets/login-signup.css";
import OTP from '@pages/OTP';
import Profile from '@pages/Profile';

export const Login = ({ onClose, onSignupClick }) => {
  //changing to add effect on eye button
  return (
<div className="login-auth-container">
      <h1>Login to HelpOps-Hub</h1>
      <button className="google-btn">
      <img src="google.png" alt="Google" />
        Sign in with Google
      </button>
      <button className="github-btn">
      <img src="github.png" alt="GitHub"  />
        Sign in with Github
      </button>
      <p>Or</p><br/>
      <input type="text" placeholder="Email or username" />
      <div class="password-input-container">
      <div class="password-wrapper">
      <input type="password" id="passwordInput" placeholder="Password" />
        <span class="toggle-password" onclick="togglePasswordVisibility()">
            <img src="eye-close.jpg" alt="Toggle password visibility" id='eyeicon-login' />
        </span>
    </div>
    </div>
    <div>
    {/* added forgot password */}
    <a href="#" onClick={onSignupClick}>Forgot Password</a><br/>
      <a href="#" onClick={onSignupClick}>New here? Sign up now</a><br/>
      <button className="login-btn">Login</button>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
</div>   
  );
};

export const Signup = ({ onClose, onLoginClick }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (email) {
      setShowOTP(true);
      // Here you would typically trigger sending an OTP to the provided email
    } else {
      alert('Please enter your email');
    }
  };

  const handleOTPSubmit = (otp) => {
    // Here you would typically verify the OTP
    console.log('OTP entered:', otp);
    // For now, we'll just move to the Profile component
    setShowProfile(true);
  };

  const handleProfileSubmit = (profileData) => {
    // Handle profile submission
    console.log('Profile data:', profileData);
    onClose(); // Close the signup process
  };

  const handleBackToSignup = () => {
    setShowOTP(false);
  };

  if (showProfile) {
    return <Profile onSubmit={handleProfileSubmit} onClose={onClose} />;
  }

  if (showOTP) {
    return <OTP onClose={onClose} onOTPSubmit={handleOTPSubmit} onBack={handleBackToSignup} />;
  }

  return (
    <div className="signup-auth-container">
      <h1>Create Your HelpOps-Hub Account</h1>
      <h5>Join the HelpOps-Hub community by registering for a new account and unlock the world of DevOps resources.</h5>
      <button className="google-btn">
        <img src="/google.png" alt="Google" />
        Sign up with Google
      </button>
      <button className="github-btn">
        <img src="/github.png" alt="GitHub" />
        Sign up with Github
      </button>
      <p>Or</p><br/>
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <a href="#" onClick={onLoginClick}>Already have an account? Login</a><br/>
      <button className="continue-btn" onClick={handleContinue}>Continue</button>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};
//making changes so that on clicking eye button password is visible
let eyeIcon = document.getElementById("eyeicon-login");
let password = document.getElementById("passwordInput");
let eyeIconLogin = document.getElementById("eyeicon-login");
let passwordLogin = document.getElementById("passwordInput");


// Set the password field to type "password" by default
password.type = "password";
eyeIcon.src = "eye-close.jpg"; // Set the initial eye icon as closed

eyeIcon.onclick = function () {
  if (password.type === "password") {
    password.type = "text";
    eyeIcon.src = "eye-open.jpg";
  } else {
    password.type = "password";
    eyeIcon.src = "eye-close.jpg";
  }
};

passwordLogin.type = "password";
eyeIconLogin.src = "eye-close.jpg"; // Set the initial eye icon as closed

eyeIconLogin.onclick = function () {
  if (passwordLogin.type === "password") {
    passwordLogin.type = "text";
    eyeIconLogin.src = "eye-open.jpg";
  } else {
    passwordLogin.type = "password";
    eyeIconLogin.src = "eye-close.jpg";
  }
};