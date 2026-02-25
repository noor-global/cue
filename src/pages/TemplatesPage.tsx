import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompt } from '../contexts/PromptContext';
import { templates } from '../data/templates';
import { AppLayout } from '../components/Layout/AppLayout';
import styles from './TemplatesPage.module.css';
import type { Template } from '../types';
import { Helmet } from 'react-helmet-async';
import { CategoryFilter } from '../components/TemplateGallery/CategoryFilter';
import { TemplateCard } from '../components/TemplateGallery/TemplateCard';

export const TemplatesPage: React.FC = () => {
  const { loadTemplate } = usePrompt();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Marketing', 'Code', 'Analysis', 'Creative'];

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const handleLoad = (template: Template) => {
    loadTemplate(template.sections, template.rules);
    navigate('/builder');
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Templates | Cue</title>
        <meta name="description" content="Browse and load structured prompt templates." />
      </Helmet>
      
      <div className={styles.pageContainer}>
        <div className={styles.header}>
            <h1>Browse Templates</h1>
            <p className={styles.subtitle}>Start with a battle-tested structure for your next prompt.</p>
        </div>
        
        <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
        />

        <div className={styles.grid}>
            {filteredTemplates.map(template => (
                <TemplateCard 
                    key={template.id} 
                    template={template} 
                    onLoad={handleLoad} 
                />
            ))}
        </div>
      </div>
    </AppLayout>
  );
};
