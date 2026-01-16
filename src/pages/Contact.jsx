import React from 'react';

const Contact = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '100px 20px',
            zIndex: 1,
            position: 'relative'
        }}>
            <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
                <h1 style={{ marginBottom: '20px', color: 'var(--accent-red)' }}>Contact Me</h1>
                <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
                    Interested in working together? I'm always looking for new challenges and projects to bring to life.
                </p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label>Name</label>
                        <input type="text" style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--accent-metal)',
                            padding: '10px',
                            color: 'white',
                            fontFamily: 'var(--font-body)'
                        }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label>Email</label>
                        <input type="email" style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--accent-metal)',
                            padding: '10px',
                            color: 'white',
                            fontFamily: 'var(--font-body)'
                        }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label>Message</label>
                        <textarea rows="5" style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--accent-metal)',
                            padding: '10px',
                            color: 'white',
                            fontFamily: 'var(--font-body)'
                        }}></textarea>
                    </div>

                    <button className="glass-btn" style={{ marginTop: '10px' }}>
                        Send Message
                    </button>
                </form>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
                    <p>Email: <a href="mailto:orcun@example.com" style={{ color: 'var(--accent-cyan)' }}>orcun@example.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
