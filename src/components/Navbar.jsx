import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
import Logo from './Logo';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigation = (id) => {
        setIsMenuOpen(false); // Close menu on click

        // If we are on the home page (or target page is home), just scroll
        if (location.pathname === '/' && (id === 'about' || id === 'contact')) {
            handleScroll(id);
        } else if (location.pathname === '/3d' && id === 'contact') {
            // If we are on 3D page and want contact, scroll to contact footer there
            handleScroll(id);
        } else {
            // Navigate to home then scroll (simple hash navigation backup)
            navigate('/');
            setTimeout(() => handleScroll(id), 100);
        }
    };

    const handleHomeClick = (e) => {
        setIsMenuOpen(false);
        // Always scroll to top if we are going to Home, even if currently there
        if (location.pathname === '/') {
            e.preventDefault();
            // Small timeout to ensure no router conflict
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Also remove hash if any
                if (window.location.hash) {
                    window.history.pushState("", document.title, window.location.pathname);
                }
            }, 10);
        }
    };

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            borderRadius: 0,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            padding: 0 // Padding moved to container
        }}>
            <div className="nav-container">
                <Link to="/" onClick={handleHomeClick} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Logo height={80} width={80} />
                </Link>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰'}
                </div>

                {/* Links */}
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={handleHomeClick} style={{ textDecoration: 'none' }}>
                        <span style={{
                            color: location.pathname === '/' ? 'var(--accent-red)' : 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-heading)'
                        }}>Home</span>
                    </Link>


                    <div onClick={() => handleNavigation('about')} style={{ cursor: 'pointer' }}>
                        <span style={{
                            color: location.pathname === '/' && window.location.hash === '#about' ? 'var(--accent-red)' : 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-heading)'
                        }}>About</span>
                    </div>

                    <Link to="/gallery" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
                        <span style={{
                            color: location.pathname === '/gallery' ? 'var(--accent-red)' : 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-heading)'
                        }}>Gallery</span>
                    </Link>

                    <Link to="/3d" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
                        <span style={{
                            color: location.pathname === '/3d' ? 'var(--accent-red)' : 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-heading)'
                        }}>Interactive 3D</span>
                    </Link>

                    <div onClick={() => handleNavigation('contact')} style={{ cursor: 'pointer' }}>
                        <span style={{
                            color: location.pathname === '/contact' ? 'var(--accent-red)' : 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-heading)'
                        }}>Contact</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
