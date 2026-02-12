import React from 'react';
import { motion } from 'framer-motion';
import styles from './LandingComponents.module.css';

const testimonials = [
  {
    quote: "Cue transformed how I write prompts. The structure forces me to think clearly, and the results are 10x better.",
    author: "Alex Rivera",
    role: "Senior Developer",
    avatar: "AR"
  },
  {
    quote: "Finally, a tool that treats prompt engineering like actual engineering. The template system is a lifesaver.",
    author: "Sarah Chen",
    role: "AI Researcher",
    avatar: "SC"
  },
  {
    quote: "I used to have messy text files everywhere. Now my prompts are versioned, organized, and reusable.",
    author: "Mike Ross",
    role: "Product Manager",
    avatar: "MR"
  },
  {
    quote: "The ability to export to JSON makes integrating with my own apps incredibly simple. Highly recommended.",
    author: "Jessica Wu",
    role: "Indie Hacker",
    avatar: "JW"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Community Love
        </motion.h2>
        
        <div className={styles.testimonialsScroll}>
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                    <div className={styles.avatarInner}>
                        {t.avatar}
                    </div>
                </div>
                <div className={styles.authorInfo}>
                  <h4>{t.author}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
