import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Section, Rule, PromptState } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface PromptContextType extends PromptState {
  addSection: () => void;
  updateSection: (id: string, field: keyof Section, value: string) => void;
  removeSection: (id: string) => void;
  reorderSection: (oldIndex: number, newIndex: number) => void;
  addRule: () => void;
  updateRule: (id: string, value: string) => void;
  removeRule: (id: string) => void;
  reorderRule: (oldIndex: number, newIndex: number) => void;
  setApiKey: (key: string) => void;
  setModel: (model: string) => void;
  resetPrompt: () => void;
  loadTemplate: (sections: Section[], rules: Rule[]) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return context;
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [apiKey, setApiKeyState] = useState('');
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-sonnet');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('cue-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSections(parsed.sections || []);
        setRules(parsed.rules || []);
        setApiKeyState(parsed.apiKey || '');
        setSelectedModel(parsed.selectedModel || 'anthropic/claude-3-sonnet');
      } catch (e) {
        console.error("Failed to load state", e);
      }
    } else {
        // Initial state
        addSection();
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    const state = { sections, rules, apiKey, selectedModel };
    localStorage.setItem('cue-state', JSON.stringify(state));
  }, [sections, rules, apiKey, selectedModel]);

  const addSection = () => {
    setSections(prev => [...prev, { id: uuidv4(), title: '', content: '' }]);
  };

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const addRule = () => {
    setRules(prev => [...prev, { id: uuidv4(), content: '' }]);
  };

  const updateRule = (id: string, value: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, content: value } : r));
  };

  const removeRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const reorderSection = (oldIndex: number, newIndex: number) => {
    setSections(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  const reorderRule = (oldIndex: number, newIndex: number) => {
    setRules(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };
  
  const setApiKey = (key: string) => setApiKeyState(key);
  
  const setModel = (model: string) => setSelectedModel(model);

  const resetPrompt = () => {
      setSections([]);
      setRules([]);
      addSection();
  };

  const loadTemplate = (newSections: Section[], newRules: Rule[]) => {
      // Assign new IDs to avoid conflicts
      const sectionsWithIds = newSections.map(s => ({ ...s, id: uuidv4() }));
      const rulesWithIds = newRules.map(r => ({ ...r, id: uuidv4() }));
      setSections(sectionsWithIds);
      setRules(rulesWithIds);
  };

  return (
    <PromptContext.Provider value={{
      sections,
      rules,
      apiKey,
      selectedModel,
      addSection,
      updateSection,
      removeSection,
      reorderSection,
      addRule,
      updateRule,
      removeRule,
      reorderRule,
      setApiKey,
      setModel,
      resetPrompt,
      loadTemplate
    }}>
      {children}
    </PromptContext.Provider>
  );
};
