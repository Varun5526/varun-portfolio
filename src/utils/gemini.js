import { generateOfflineResponse } from '../data/portfolio-context';

export const callAssistant = async (prompt, systemInstruction, contextData) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return generateOfflineResponse(prompt, contextData);
};
