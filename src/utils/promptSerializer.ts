import type { Section, Rule } from '../types';

export type ExportFormat = 'markdown' | 'json' | 'minimal' | 'toon';

export const toMarkdown = (sections: Section[], rules: Rule[]): string => {
  let md = '';
  
  // Rules first
  if (rules.length > 0) {
      md += '# Rules\n';
      rules.forEach(r => md += `- ${r.content}\n`);
      md += '\n';
  }
  
  // Sections
  sections.forEach(s => {
      if (s.title) md += `# ${s.title}\n\n`;
      if (s.content) md += `${s.content}\n\n`;
  });
  
  return md.trim();
};

export const toFullJSON = (sections: Section[], rules: Rule[]): string => {
    return JSON.stringify({ sections, rules }, null, 2);
};

export const toMinimalJSON = (sections: Section[], rules: Rule[]): string => {
    // Optimized format: just the essential content to save tokens
    const minimal = {
        rules: rules.map(r => r.content),
        sections: sections.reduce((acc, s) => {
            if (s.title || s.content) {
                acc[s.title || 'Untitled'] = s.content;
            }
            return acc;
        }, {} as Record<string, string>)
    };
    return JSON.stringify(minimal, null, 2);
};

export const toToon = (sections: Section[], rules: Rule[]): string => {
    let output = '';

    if (rules.length > 0) {
        output += 'RULES\n';
        rules.forEach(r => output += `- ${r.content}\n`);
        output += '\n';
    }

    sections.forEach(s => {
        if (s.title) output += `[${s.title}]\n`;
        if (s.content) output += `${s.content}\n\n`;
    });

    return output.trim();
};

export const serializePrompt = (sections: Section[], rules: Rule[], format: ExportFormat): string => {
    switch (format) {
        case 'markdown':
            return toMarkdown(sections, rules);
        case 'json':
            return toFullJSON(sections, rules);
        case 'minimal':
            return toMinimalJSON(sections, rules);
        case 'toon':
            return toToon(sections, rules);
        default:
            return '';
    }
};
