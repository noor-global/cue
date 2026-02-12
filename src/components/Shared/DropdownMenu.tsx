import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DropdownMenu.module.css';
import { clsx } from 'clsx';

interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Pass isOpen and setIsOpen to Trigger and Content
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
};

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean; isOpen?: boolean; setIsOpen?: (open: boolean) => void }> = ({ children, setIsOpen, isOpen }) => (
  <div onClick={() => setIsOpen?.(!isOpen)} className={styles.trigger}>
    {children}
  </div>
);

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; align?: 'start' | 'end'; isOpen?: boolean }> = ({ children, align = 'start', isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={clsx(styles.content, styles[align])}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const DropdownMenuGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.group}>{children}</div>
);

export const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <div className={styles.item} onClick={onClick}>
    {children}
  </div>
);

export const DropdownMenuSeparator: React.FC = () => (
  <div className={styles.separator} />
);
