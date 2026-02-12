import type { Section, Rule } from '../types';

export const exportToJSON = (sections: Section[], rules: Rule[]) => {
    const data = {
        meta: {
            generator: "Cue",
            version: "2.0",
            date: new Date().toISOString()
        },
        prompt: {
            rules,
            sections
        }
    };
    return JSON.stringify(data, null, 2);
};

export const exportToMarkdown = (sections: Section[], rules: Rule[]) => {
    let md = '';
    
    if (rules.length > 0) {
        md += '# Rules\n';
        rules.forEach(r => md += `- ${r.content}\n`);
        md += '\n';
    }
    
    sections.forEach(s => {
        if (s.title) md += `# ${s.title}\n\n`;
        if (s.content) md += `${s.content}\n\n`;
    });
    
    return md.trim();
};

export const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
