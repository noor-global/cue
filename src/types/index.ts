export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface Rule {
  id: string;
  content: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'Marketing' | 'Code' | 'Analysis' | 'Creative' | 'Other';
  sections: Section[];
  rules: Rule[];
  tags: string[];
}

export interface PromptState {
  sections: Section[];
  rules: Rule[];
  apiKey: string;
  selectedModel: string;
}
