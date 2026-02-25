import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Landing/LandingComponents.module.css'; // Reusing landing styles for consistency
import logo from '../../assets/logo.ico';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerBrand}>
                    <img src={logo} alt="Cue" width={24} height={24} />
                    <span>Cue</span>
                </div>
                
                <div className={styles.footerLinks}>
                    <Link to="/" className={styles.footerLink}>Home</Link>
                    <Link to="/builder" className={styles.footerLink}>Builder</Link>
                    <a href="https://github.com/noor-global/cue" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                        GitHub
                    </a>
                </div>

                <div className={styles.copyright}>
                    © {new Date().getFullYear()} Cue. Open Source.
                </div>
            </div>
        </footer>
    );
};
