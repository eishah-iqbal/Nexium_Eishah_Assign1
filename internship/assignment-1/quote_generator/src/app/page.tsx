'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Github} from "lucide-react";
import quotes from "./data/quotes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  type Topic = keyof typeof quotes;

  const handleSubmit = () => {
    const key = topic.toLowerCase().trim() as Topic;

    if (key in quotes) {
      setResults(quotes[key].slice(0, 3));
    } else {
      setResults(["No quotes found for this topic."]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100 text-gray-800">
    
    {/* Header*/}
      <header className="w-full bg-purple-900 text-white py-4 shadow-md">
  <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
    
    <div className="flex items-center gap-2 text-lg font-semibold">
      <span>💬</span>
      <span>Quote Generator</span>
    </div>

   <a
      href="https://github.com/eishah-iqbal/Nexium_Eishah_Assign1/tree/main/internship/assignment-1/quote_generator"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        className=" border: bg-purple-900 hover:text-purple-900 transition-colors"
      >
        <Github className="mr-1 h-2 w-2" />
        Github
      </Button>
    </a>
  </div>
</header>


      <main className="flex flex-col items-center justify-center flex-1 px-4 py-20">
       

        <div className="flex flex-col items-center gap-10 w-full max-w-md">
          <Input
            placeholder="Enter a topic (e.g. love, motivation, education)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-white"
          />
          <Button
            onClick={handleSubmit}
            className="bg-purple-900 hover:bg-purple-800 text-white"
          >
            Generate
          </Button>
        </div>

        <div className="mt-8 space-y-4 text-center max-w-xl">
          {results.map((quote, index) => (
            <p key={index} className="text-lg italic text-gray-700">
              {quote}
            </p>
          ))}
        </div>
      </main>

      <footer className="w-full bg-purple-900 text-white text-center py-3 text-sm">
        © 2025 Made by Eishah
      </footer>
    </div>
  );
}