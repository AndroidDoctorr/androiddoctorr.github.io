import { randomFacts } from './variables.js';

export function getRandomFact() {
  const factCount = randomFacts.length - 1;
  if (factCount > 0) {
    const index = Math.floor(Math.random() * factCount);
    return "Random fact: " + randomFacts[index];
  }
  return "";
}
