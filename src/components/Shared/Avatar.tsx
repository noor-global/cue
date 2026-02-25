import React from 'react';
import styles from './Avatar.module.css';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className }) => {
  return (
    <div className={clsx(styles.avatar, className)}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.fallback}>{fallback}</div>
      )}
    </div>
  );
};

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => (
  <img className={clsx(styles.image, className)} {...props} />
);

export const AvatarFallback: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.fallback, className)}>{children}</div>
);
