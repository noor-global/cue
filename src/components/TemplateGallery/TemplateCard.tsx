import React from 'react';
import { Button } from '../Shared/Button';
import type { Template } from '../../types';
import styles from '../../pages/TemplatesPage.module.css';

interface TemplateCardProps {
    template: Template;
    onLoad: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onLoad }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{template.title}</h3>
            <p className={styles.desc}>{template.description}</p>
            <div className={styles.tags}>
                {template.tags.map(tag => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
            </div>
            <Button onClick={() => onLoad(template)} variant="primary" className={styles.loadBtn}>
                Load Template
            </Button>
        </div>
    );
};
