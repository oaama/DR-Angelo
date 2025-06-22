import { config } from 'dotenv';
config();

import '@/ai/flows/ai-doctor-match.ts';
import '@/ai/flows/welcome-message-flow.ts';
import '@/ai/flows/prescription-analyzer-flow.ts';
