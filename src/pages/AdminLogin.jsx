import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if already logged in
    useEffect(() => {
        if (sessionStorage.getItem('adminAuth') === 'true') {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (res.ok) {
                sessionStorage.setItem('adminAuth', 'true');
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Server error, please try again');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-dark)'
        }}>
            <div className="glass-panel" style={{
                padding: '40px',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--accent-red)',
                    marginBottom: '30px',
                    textAlign: 'center'
                }}>
                    ADMIN LOGIN
                </h1>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '4px',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                            placeholder="Enter admin password"
                        />
                    </div>

                    {error && (
                        <p style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="glass-btn"
                        style={{
                            width: '100%',
                            padding: '15px',
                            fontSize: '1rem'
                        }}
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
