import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './LandingComponents.module.css';

const faqs = [
  {
    question: "Is Cue free to use?",
    answer: "Yes! Cue is a free, open-source tool. You can use all features without any cost."
  },
  {
    question: "Where is my data stored?",
    answer: "Your prompts and settings are stored locally in your browser. We don't send your data to any server."
  },
  {
    question: "Can I export my prompts?",
    answer: "Absolutely. You can export your structured prompts to Markdown, JSON, or plain text for use in ChatGPT, Claude, or your own applications."
  },
  {
    question: "Do you offer pre-built templates?",
    answer: "Yes, Cue comes with a library of templates for coding, marketing, writing, and more to help you get started quickly."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
                <motion.div 
                    key={index} 
                    className={styles.faqItem}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <button 
                        className={styles.faqQuestion}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        {faq.question}
                        {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.faqAnswer}>
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
