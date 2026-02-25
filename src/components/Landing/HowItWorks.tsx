import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sliders, Download } from 'lucide-react';
import styles from './LandingComponents.module.css';

const steps = [
  {
    icon: <FileText size={32} />,
    title: "1. Select Structure",
    description: "Choose from battle-tested templates or start from scratch with a clean slate."
  },
  {
    icon: <Sliders size={32} />,
    title: "2. Customize Rules",
    description: "Add specific constraints, changing variables, and tone guidelines."
  },
  {
    icon: <Download size={32} />,
    title: "3. Export & Use",
    description: "Copy your structured prompt as Markdown or JSON for any AI model."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className={styles.section}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
              {index < steps.length - 1 && <div className={styles.connector} />}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
