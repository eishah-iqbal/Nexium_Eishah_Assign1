import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = 'blog_summariser';

export async function saveToMongo(url: string, fullText: string) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('fulltexts');

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date(),
    });

    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('MongoDB insert error:', error);
    return { success: false, error };
  } finally {
    await client.close();
  }
}