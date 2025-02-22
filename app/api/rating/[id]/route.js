import redis from '../../../lib/redis';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  const key = `rating:${id}`;

  try {
    const rating = await redis.hgetall(key);
    const average = rating.total && rating.votes 
      ? (parseFloat(rating.total) / parseInt(rating.votes)).toFixed(1) 
      : '0.0';

    return NextResponse.json({
      average,
      votes: rating.votes || 0,
      total: rating.total || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get rating' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const key = `rating:${id}`;
  const { rating } = await request.json();

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
  }

  try {
    const [total, votes] = await redis
      .multi()
      .hincrby(key, 'total', rating)
      .hincrby(key, 'votes', 1)
      .exec();

    const average = (total[1] / votes[1]).toFixed(1);

    return NextResponse.json({
      average,
      votes: votes[1],
      total: total[1],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}