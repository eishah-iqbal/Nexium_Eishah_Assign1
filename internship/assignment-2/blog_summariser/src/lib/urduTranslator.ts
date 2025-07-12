import { urduDictionary } from './urduDictionary';

export function translateToUrdu(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, '')
    .split(' ')
    .map((word) => urduDictionary[word] || word)
    .join(' ');
}