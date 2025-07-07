import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
          fontWeight: 'bold'
        }}>
          TM
        </div>
        <h1>Welcome to TaskMaster</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Your personal task management companion
        </p>
      </div>
      
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      </div>
      
      <button 
        className="btn-primary" 
        onClick={handleLogin}
        disabled={isLoading}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {isLoading ? (
          <>
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            Getting Started...
          </>
        ) : (
          <>
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Get Started
          </>
        )}
      </button>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        padding: '1rem',
        background: 'var(--background-secondary)',
        borderRadius: 'var(--radius-lg)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--text-secondary)'
      }}>
        <p style={{ margin: 0 }}>
          💡 Tip: Use any username to get started. Your tasks will be saved locally.
        </p>
      </div>
    </div>
  );
};

export default Login;
