const urduDict: Record<string, string> = {
  "focus": "توجہ",
  "productivity": "پیداواریت",
  "importance": "اہمیت",
  "discusses": "بات کرتا ہے",
  "blog": "بلاگ",
  "the": "یہ",
  "and": "اور",
  "this": "یہ",
  "of": "کا",
};

export function translateToUrdu(summary: string): string {
  return summary
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(" ")
    .map((word) => urduDict[word] || word)
    .join(" ");
}