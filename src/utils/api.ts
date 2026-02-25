
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const generateCompletion = async (apiKey: string, model: string, messages: Message[]) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.href,
      'X-Title': 'Cue'
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: response.statusText } }));
    throw new Error(error.error?.message || 'Failed to generate completion');
  }

  return response.json();
};
