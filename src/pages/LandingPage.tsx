import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppLayout } from '../components/Layout/AppLayout';
import { Button } from '../components/Shared/Button';
import { Sparkles, Zap, Layout as LayoutIcon, Share2, ArrowRight } from 'lucide-react';
import styles from './LandingPage.module.css';
import { Helmet } from 'react-helmet-async';
import ShinyText from '../components/Shared/ShinyText';
import LightRays from '../components/Shared/LightRays';
import { HowItWorks } from '../components/Landing/HowItWorks';
import { Testimonials } from '../components/Landing/Testimonials';
import { FAQ } from '../components/Landing/FAQ';
import { Footer } from '../components/Layout/Footer';
import { FeatureCard } from '../components/Landing/FeatureCard';

export const LandingPage: React.FC = () => {
  return (
    <AppLayout noPadding>
      <Helmet>
        <title>Cue - Structured Prompt Builder</title>
        <meta name="description" content="Build better AI prompts with structure, templates, and rules. The professional prompt engineering tool." />
      </Helmet>
      
      <section className={styles.hero}>
        <div className={styles.lightRaysContainer}>
             <LightRays
                raysOrigin="top-center"
                raysColor="#ffffff"
                raysSpeed={1}
                lightSpread={0.5}
                rayLength={3}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0}
                className="custom-rays"
                pulsating={false}
                fadeDistance={1}
                saturation={1}
            />
        </div>
        <div className={styles.heroContent}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className={styles.badge}>
                    <Sparkles size={14} className={styles.badgeIcon} />
                    <span>v1.0 Now Available</span>
                </div>
                <h1 className={styles.title}>
                Craft Perfect Prompts <br />
                <ShinyText text="With Precision" disabled={false} speed={3} className={styles.gradientText} />
                </h1>
                <p className={styles.subtitle}>
                Stop wrestling with chaotic text files. Build, organize, and optimize your AI prompts with a professional structured builder.
                </p>
                <div className={styles.ctaGroup}>
                    <Link to="/builder">
                        <Button size="lg" className={styles.primaryBtn}>
                            Start Building <ArrowRight size={18} />
                        </Button>
                    </Link>
                    <a href="https://github.com/muntasiractive/cue" target="_blank" rel="noopener noreferrer">
                         <Button variant="secondary" size="lg">Star on GitHub</Button>
                    </a>
                </div>
            </motion.div>
        </div>
        <div className={styles.heroBackground}>
            <div className={styles.glow} />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
            <FeatureCard 
                icon={<LayoutIcon size={24} />}
                title="Structured Design"
                description="Break down complex prompts into manageable sections and rules for better AI understanding."
                delay={0.2}
            />
            <FeatureCard 
                icon={<Zap size={24} />}
                title="Instant Templates"
                description="Start fast with battle-tested templates for coding, marketing, and analysis."
                delay={0.3}
            />
             <FeatureCard 
                icon={<Share2 size={24} />}
                title="Export Anywhere"
                description="Export your prompts to Markdown, JSON, or plain text for use in any LLM interface."
                delay={0.4}
            />
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </AppLayout>
  );
};


