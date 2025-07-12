import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {
  const { url, content } = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();

  const db = client.db('blog_summariser');
  const collection = db.collection('blogs');

  await collection.insertOne({ url, text: content });
  await client.close();

  return NextResponse.json({ success: true });
}