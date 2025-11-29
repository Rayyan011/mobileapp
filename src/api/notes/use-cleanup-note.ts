import Constants from 'expo-constants';
import axios from 'axios';
import { createMutation } from 'react-query-kit';
import type { AxiosError } from 'axios';

type Variables = { title: string; content: string };
type Response = { title: string; content: string };

export const useCleanupNote = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ title, content }) => {
    // Try multiple ways to get the API key
    const apiKey = 
      Constants.expoConfig?.extra?.GROQ_API_KEY ||
      process.env.GROQ_API_KEY ||
      Constants.expoConfig?.extra?.GROQ_API_KEY;
    
    // Debug logging
    console.log('API Key check:', {
      hasKey: !!apiKey,
      keyLength: apiKey?.length,
      keyPrefix: apiKey?.substring(0, 10),
      extraKeys: Object.keys(Constants.expoConfig?.extra || {}),
      allExtra: Constants.expoConfig?.extra,
    });
    
    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured. Please add it to your .env file and restart the Expo dev server.');
    }

    // Build a prompt for cleaning up the note
    const prompt = `Clean up and improve this note. Make it more organized, fix any grammar or spelling errors, improve clarity, and ensure proper formatting. Return ONLY a JSON object with "title" and "content" fields. Do not include any other text or markdown formatting.

Original Title: ${title || 'Untitled'}
Original Content: ${content || ''}

Return the cleaned up version as JSON with "title" and "content" fields:`;

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that cleans up and improves notes. Always return valid JSON with "title" and "content" fields. Do not include any markdown formatting or code blocks for first person notes always rewrite in first person.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Parse the JSON response
      const responseText = response.data.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error('No response from AI');
      }

      // Try to parse JSON (handle cases where it might be wrapped in markdown)
      let cleaned;
      try {
        cleaned = JSON.parse(responseText);
      } catch (parseError) {
        // If parsing fails, try to extract JSON from markdown code blocks
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                         responseText.match(/```\s*([\s\S]*?)\s*```/) ||
                         [null, responseText];
        cleaned = JSON.parse(jsonMatch[1] || responseText);
      }
      
      return {
        title: cleaned.title || title || 'Untitled',
        content: cleaned.content || content,
      };
    } catch (error) {
      console.error('Error cleaning up note:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
        
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your GROQ_API_KEY.');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (error.response?.status === 400) {
          const errorMsg = error.response?.data?.error?.message || 'Bad request';
          throw new Error(`API error: ${errorMsg}`);
        }
        throw new Error(`API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  },
});

