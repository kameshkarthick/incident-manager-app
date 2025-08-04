import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const summarizeIncident = async (description: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant summarizing elderly incident reports.',
        },
        {
          role: 'user',
          content: `Summarize this incident: ${description}`,
        },
      ],
    });

    return response.choices[0].message.content?.trim() || '';
  } catch (error) {
    console.error('OpenAI error:', error);
    return '';
  }
};