import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  return (
    <motion.div 
      className={clsx(styles.card, className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </motion.div>
  );
};
