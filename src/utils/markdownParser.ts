import { v4 as uuidv4 } from 'uuid';
import type { Section, Rule } from '../types';

export const parseMarkdownToState = (markdown: string): { sections: Section[], rules: Rule[] } => {
  const sections: Section[] = [];
  const rules: Rule[] = [];
  
  const lines = markdown.split('\n');
  let currentSection: Section | null = null;
  let capturingRules = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for Headings
    if (line.startsWith('#')) {
      // Determine heading level and title
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const title = match[2].trim();
        
        // Check if this is the "Rules" section
        if (title.toLowerCase() === 'rules') {
          capturingRules = true;
          currentSection = null; // Stop capturing content for previous section
        } else {
          capturingRules = false;
          // Create new section
          currentSection = {
            id: uuidv4(),
            title: title,
            content: ''
          };
          sections.push(currentSection);
        }
        continue;
      }
    }

    // Capture Rules
    if (capturingRules) {
      // Check for list items (-, *, 1.)
      const listMatch = line.match(/^[-*]|\d+\.\s+(.*)$/);
      if (listMatch || (line.startsWith('- ') || line.startsWith('* '))) {
         const content = line.replace(/^[-*]|\d+\.\s+/, '').trim();
         if (content) {
             rules.push({
                 id: uuidv4(),
                 content: content
             });
         }
      }
      continue;
    }

    // Capture Section Content
    if (currentSection) {
      if (currentSection.content) {
        currentSection.content += '\n' + line;
      } else {
        currentSection.content = line;
      }
    } else if (line && sections.length === 0) {
        // Content before any heading - create a default "Intro" section
        currentSection = {
            id: uuidv4(),
            title: 'Introduction',
            content: line
        };
        sections.push(currentSection);
    }
  }
  
  // Clean up whitespace in sections
  sections.forEach(s => {
      s.content = s.content.trim();
  });

  return { sections, rules };
};
