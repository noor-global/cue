import React from 'react';
import { motion } from 'framer-motion';
import styles from './LandingComponents.module.css';

const testimonials = [
  {
    quote: "Cue has revolutionized how I write prompts for my research projects. Highly recommended!",
    author: "Marzia Khan Misty",
    role: "Lecturer and Solar Energy Researcher",
    avatar: "MK"
  },
  {
    quote: "Finally, a tool that treats prompt engineering like actual engineering. The template system is a lifesaver.",
    author: "Jim Nun",
    role: "UI/UX Designer",
    avatar: "JN"
  },
  {
    quote: "I used to have messy text files everywhere. Now my prompts are versioned, organized, and reusable.",
    author: "Sohanur Rahman",
    role: "Lecturer in Physics",
    avatar: "SR"
  },
  {
    quote: "The ability to export to JSON makes integrating with my own apps incredibly simple. Highly recommended.",
    author: "Muntasir Rahman",
    role: "Software Engineer",
    avatar: "MR"
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
