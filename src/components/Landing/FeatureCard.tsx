import React from 'react';
import { motion } from 'framer-motion';
import styles from './LandingComponents.module.css';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
    return (
        <motion.div 
            className={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className={styles.iconWrapper}>{icon}</div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDesc}>{description}</p>
        </motion.div>
    );
};
