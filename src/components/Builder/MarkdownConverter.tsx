import React, { useState, useEffect } from 'react';
import { X, Copy, Check, FileDown } from 'lucide-react';
import { Button } from '../Shared/Button';
import { parseMarkdownToState } from '../../utils/markdownParser';
import styles from './MarkdownConverter.module.css';
import { usePrompt } from '../../contexts/PromptContext';

interface MarkdownConverterProps {
    onClose: () => void;
}

export const MarkdownConverter: React.FC<MarkdownConverterProps> = ({ onClose }) => {
    const { loadTemplate } = usePrompt();
    const [markdown, setMarkdown] = useState('');
    const [jsonResult, setJsonResult] = useState<string>('');
    const [parsedData, setParsedData] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!markdown.trim()) {
            setJsonResult('');
            setParsedData(null);
            return;
        }
        
        try {
            const result = parseMarkdownToState(markdown);
            setParsedData(result);
            setJsonResult(JSON.stringify(result, null, 2));
        } catch (e) {
            console.error("Parse error", e);
        }
    }, [markdown]);

    const handleCopy = () => {
        if (!jsonResult) return;
        navigator.clipboard.writeText(jsonResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLoad = () => {
        if (!parsedData) return;
        loadTemplate(parsedData.sections, parsedData.rules);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Import Markdown</h3>
                    <Button variant="icon" onClick={onClose}><X size={20} /></Button>
                </div>
                
                <div className={styles.body}>
                    <div className={styles.inputSection}>
                        <label className={styles.label}>Paste Markdown Here</label>
                        <textarea 
                            className={styles.textarea} 
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            placeholder="# Introduction\n\nYour content here...\n\n# Rules\n\n- Rule 1\n- Rule 2"
                        />
                    </div>
                    
                    <div className={styles.outputSection}>
                        <label className={styles.label}>JSON Preview (Toon Format)</label>
                        <pre className={styles.pre}>
                            {jsonResult || '// Waiting for input...'}
                        </pre>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    {jsonResult && (
                        <>
                            <Button variant="secondary" onClick={handleCopy}>
                                {copied ? <Check size={16} /> : <Copy size={16} />} Copy JSON
                            </Button>
                            <Button variant="primary" onClick={handleLoad}>
                                <FileDown size={16} /> Load to Builder
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
