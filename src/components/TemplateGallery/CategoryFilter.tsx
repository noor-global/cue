import React from 'react';
import { clsx } from 'clsx';
import styles from '../../pages/TemplatesPage.module.css';

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
    categories, 
    activeCategory, 
    onSelectCategory 
}) => {
    return (
        <div className={styles.categories}>
            {categories.map(cat => (
                <button 
                    key={cat}
                    className={clsx(styles.categoryBtn, activeCategory === cat && styles.activeCat)}
                    onClick={() => onSelectCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};
