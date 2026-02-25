import type { Template } from '../types';

export const templates: Template[] = [
    {
        id: 'marketing-email',
        title: 'Cold Email Campaign',
        description: 'Generate high-converting cold emails for B2B sales.',
        category: 'Marketing',
        sections: [
            { id: '1', title: 'Product/Service', content: '' },
            { id: '2', title: 'Target Audience', content: '' },
            { id: '3', title: 'Value Proposition', content: '' },
            { id: '4', title: 'Call to Action', content: 'Schedule a 15-min call' }
        ],
        rules: [
            { id: 'r1', content: 'Keep it under 150 words' },
            { id: 'r2', content: 'Use a conversational but professional tone' },
            { id: 'r3', content: 'Focus on the recipient\'s pain points' }
        ],
        tags: ['email', 'sales', 'b2b']
    },
    {
        id: 'code-refactor',
        title: 'Code Refactoring',
        description: 'Guide for refactoring legacy code to modern standards.',
        category: 'Code',
        sections: [
            { id: 'c1', title: 'Code Snippet', content: '' },
            { id: 'c2', title: 'Current Issues', content: '' },
            { id: 'c3', title: 'Target Framework/Language', content: 'TypeScript / React' }
        ],
        rules: [
            { id: 'cr1', content: 'Follow SOLID principles' },
            { id: 'cr2', content: 'Improve readability and maintainability' },
            { id: 'cr3', content: 'Add comments for complex logic' }
        ],
        tags: ['refactoring', 'clean code', 'typescript']
    },
    {
        id: 'blog-post',
        title: 'SEO Blog Post',
        description: 'Create SEO-optimized blog content.',
        category: 'Marketing',
        sections: [
            { id: 'b1', title: 'Topic', content: '' },
            { id: 'b2', title: 'Keywords', content: '' },
            { id: 'b3', title: 'Target Audience', content: '' }
        ],
        rules: [
             { id: 'br1', content: 'Use H2 and H3 headers for structure' },
             { id: 'br2', content: 'Include the primary keyword in the introduction' },
             { id: 'br3', content: 'Write in an engaging, informative style' }
        ],
        tags: ['content', 'seo', 'blog']
    },
     {
        id: 'data-analysis',
        title: 'Data Analysis Report',
        description: 'Analyze dataset and generate insights.',
        category: 'Analysis',
        sections: [
            { id: 'd1', title: 'Dataset Description', content: '' },
            { id: 'd2', title: 'Key Questions', content: '' }
        ],
        rules: [
             { id: 'dr1', content: 'Highlight trends and outliers' },
             { id: 'dr2', content: 'Provide actionable recommendations' },
             { id: 'dr3', content: 'Use bullet points for key findings' }
        ],
        tags: ['data', 'analysis', 'report']
    }
];
