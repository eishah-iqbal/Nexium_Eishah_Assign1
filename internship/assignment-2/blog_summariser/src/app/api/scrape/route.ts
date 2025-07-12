import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    // Simple logic: collect all <p> tags as blog content
    const paragraphs: string[] = [];
    $('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 50) {
        paragraphs.push(text);
      }
    });

    const blogText = paragraphs.slice(0, 10).join('\n\n'); // Limit to 10 paragraphs

    return NextResponse.json({ content: blogText });
  } catch {
    return NextResponse.json({ error: "Failed to scrape the blog." }, { status: 500 });
  }
}