'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { generateSummary } from '@/lib/summaryGenerator';
import { translateToUrdu } from '@/lib/urduTranslator';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [urduSummary, setUrduSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarise = () => {
    if (!url.trim()) {
      setError("⛔ Please enter a blog URL before summarizing.");
      return;
    }

    setError('');
    const fakeSummary = generateSummary("FAKE FULL TEXT");
    setSummary(fakeSummary);
    setUrduSummary('');
  };

  const handleTranslate = () => {
    if (!url.trim()) {
      setError("⛔ Please enter a blog URL before translating.");
      return;
    }

    if (!summary) {
      setError("⛔ Please summarize the blog before translating.");
      return;
    }

    setError('');
    const translated = translateToUrdu(summary);
    setUrduSummary(translated);
  };

  return (
    <main
      className="min-h-screen w-full bg-cover bg-center grid grid-cols-1 md:grid-cols-2"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="flex items-center justify-center p-6">
        <Card className="bg-white/10 border border-yellow-500 text-white backdrop-blur-md shadow-lg w-full max-w-md px-8 py-10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-yellow-300 text-2xl">
              📝 Blog Brief
            </CardTitle>
            <CardDescription className="text-white text-sm">
              Paste a blog URL to generate its summary and Urdu translation.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 items-center">
            <Input
              type="url"
              placeholder="Enter blog URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white text-black mb-2 w-full"
            />

            {error && (
              <p className="text-red-300 text-sm text-center -mt-2">{error}</p>
            )}

            <div className="flex gap-4 w-full">
              <Button
                onClick={handleSummarise}
                className="bg-yellow-500 hover:bg-yellow-600 text-black flex-1"
              >
                Summarize
              </Button>
              <Button
                onClick={handleTranslate}
                className="bg-yellow-500 hover:bg-yellow-600 text-black flex-1"
              >
                Translate
              </Button>
            </div>

            {summary && (
              <div className="mt-4 text-sm text-white space-y-2 w-full">
                <p>
                  <span className="font-semibold text-yellow-300">Summary:</span> {summary}
                </p>
                {urduSummary && (
                  <p>
                    <span className="font-semibold text-yellow-300">Translation:</span> {urduSummary}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:block" />
    </main>
  );
}