import React, { useState } from 'react';
import { usePrompt } from '../../contexts/PromptContext';
import { Card } from '../Shared/Card';
import { Button } from '../Shared/Button';
import { Copy, Download } from 'lucide-react';
import styles from './Preview.module.css';
import { downloadFile } from '../../utils/export';
import { serializePrompt } from '../../utils/promptSerializer';
import type { ExportFormat } from '../../utils/promptSerializer';
import { Dropdown } from '../Shared/Dropdown';
import type { DropdownOption } from '../Shared/Dropdown';

export const Preview: React.FC = () => {
  const { sections, rules } = usePrompt();
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [copied, setCopied] = useState(false);

  const formatOptions: DropdownOption[] = [
      { label: 'Markdown', value: 'markdown' },
      { label: 'Minimal JSON', value: 'minimal' },
      { label: 'Toon', value: 'toon' },
  ];

  const getContent = () => serializePrompt(sections, rules, format);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
      const content = getContent();
      let ext = 'md';
      let mime = 'text/markdown';

      switch (format) {
          case 'minimal':
              ext = 'json';
              mime = 'application/json';
              break;
          case 'toon':
              ext = 'txt';
              mime = 'text/plain';
              break;
      }

      downloadFile(content, `prompt.${ext}`, mime);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h3 className={styles.heading}>Preview</h3>
        <div className={styles.actions}>
            <Dropdown 
                options={formatOptions}
                value={format}
                onChange={(val) => setFormat(val as ExportFormat)}
                className={styles.dropdown}
            />
            
            <Button variant="secondary" size="sm" onClick={handleExport}>
                <Download size={16} /> Export
            </Button>
            <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                {copied ? "Copied!" : <><Copy size={16} /> Copy</>}
            </Button>
        </div>
      </div>
      <Card className={styles.previewCard}>
        <pre className={styles.content}>{getContent() || <span className={styles.placeholder}>Start adding sections to see preview...</span>}</pre>
      </Card>
    </div>
  );
};
