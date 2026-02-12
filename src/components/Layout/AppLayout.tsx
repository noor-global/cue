import { NavigationDropdown } from './NavigationDropdown';
import styles from './AppLayout.module.css';
import { clsx } from 'clsx';

interface AppLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, noPadding = false }) => {
  return (
    <div className={styles.container}>
      <NavigationDropdown />

      <main className={clsx(styles.main, noPadding && styles.noPadding)}>
        {children}
      </main>
    </div>
  );
};
