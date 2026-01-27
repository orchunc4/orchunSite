import React, { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };
    return (
        <div id="contact" style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '100px 20px'
        }}>
            {/* Background Render */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/renders/oceanShot_01.000err5%20copy.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4)',
                zIndex: 0
            }} />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,1) 100%)',
                zIndex: 1
            }} />

            <div className="glass-panel" style={{
                zIndex: 2,
                maxWidth: '600px',
                width: '100%',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(25px) saturate(180%)',
                WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
            }}>
                <h1 style={{ marginBottom: '20px', color: 'var(--accent-red)', textShadow: '0 0 15px rgba(139, 0, 0, 0.3)' }}>Contact Me</h1>
                <p style={{ marginBottom: '30px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    Interested in working together? I'm always looking for new challenges and projects to bring to life.
                </p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>NAME</label>
                        <input type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            style={{
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '12px',
                                color: 'white',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-body)',
                                transition: 'border 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>EMAIL</label>
                        <input type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '12px',
                                color: 'white',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-body)',
                                transition: 'border 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>MESSAGE</label>
                        <textarea rows="5"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            style={{
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '12px',
                                color: 'white',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-body)',
                                transition: 'border 0.3s ease',
                                resize: 'vertical'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        ></textarea>
                    </div>

                    <button className="glass-btn" style={{ marginTop: '10px', width: '100%', opacity: status === 'loading' ? 0.7 : 1 }} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && <p style={{ color: '#4caf50', textAlign: 'center' }}>Message sent successfully!</p>}
                    {status === 'error' && <p style={{ color: '#f44336', textAlign: 'center' }}>Failed to send message. Try again.</p>}
                </form>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Email: <a href="mailto:orcun@example.com" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>orcun@example.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
