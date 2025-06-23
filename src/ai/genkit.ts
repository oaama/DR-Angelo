import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const gemini15Flash = googleAI.model('gemini-1.5-flash-latest');

export const ai = genkit({
  plugins: [googleAI()],
});
