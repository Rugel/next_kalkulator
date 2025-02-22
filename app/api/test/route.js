import redis from '../../lib/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await redis.set('test-key', 'Hello from Upstash!');
    const value = await redis.get('test-key');
    return NextResponse.json({ message: value });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}