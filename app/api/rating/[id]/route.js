import redis from '../../../lib/redis';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  }

  const key = `rating:${id}`;

  try {
    const rating = await redis.hgetall(key);
    const total = parseInt(rating?.total) || 0;
    const votes = parseInt(rating?.votes) || 0;
    const average = votes > 0 ? (total / votes).toFixed(1) : '0.0';

    return NextResponse.json({
      average,
      votes,
      total,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get rating' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  }

  const { rating } = await request.json();

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
  }

  const key = `rating:${id}`;

  try {
    const [total, votes] = await redis
      .multi()
      .hincrby(key, 'total', rating)
      .hincrby(key, 'votes', 1)
      .exec();

    const average = votes[1] > 0 ? (total[1] / votes[1]).toFixed(1) : '0.0';

    return NextResponse.json({
      average,
      votes: votes[1],
      total: total[1],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}