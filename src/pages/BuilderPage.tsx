import { useState } from 'react';
import { usePrompt } from '../contexts/PromptContext';
import { SectionList } from '../components/Builder/SectionList';
import { RuleList } from '../components/Builder/RuleList';
import { Preview } from '../components/Builder/Preview';
import { AppLayout } from '../components/Layout/AppLayout';
import { Button } from '../components/Shared/Button';
import { MarkdownConverter } from '../components/Builder/MarkdownConverter';
import { FileUp, RotateCcw } from 'lucide-react';
import styles from './BuilderPage.module.css';
import { Helmet } from 'react-helmet-async';

export const BuilderPage: React.FC = () => {
  const [showConverter, setShowConverter] = useState(false);
  const { resetPrompt } = usePrompt();

  return (
    <AppLayout>
      <Helmet>
        <title>Builder | Cue</title>
        <meta name="description" content="Build structured prompts with Cue." />
      </Helmet>
      
      {showConverter && <MarkdownConverter onClose={() => setShowConverter(false)} />}
      
      <div className={styles.grid}>
        <div className={styles.editor}>
          <div className={styles.toolbar}>
             <Button variant="secondary" size="sm" onClick={() => setShowConverter(true)}>
                 <FileUp size={16} /> Import Markdown
             </Button>
             <Button variant="secondary" size="sm" onClick={resetPrompt} className={styles.resetBtn}>
                 <RotateCcw size={16} /> Reset
             </Button>
          </div>
          <RuleList />
          <SectionList />
        </div>
        <div className={styles.preview}>
          <Preview />
        </div>
      </div>
    </AppLayout>
  );
};
