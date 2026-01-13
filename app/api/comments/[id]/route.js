import redis from '../../../lib/redis';
import { NextResponse } from 'next/server';

const FORBIDDEN_WORDS = [
    'chuj', 'chuja', 'chujem', 'chujowi', 'chuju', 'chuje', 'cipa', 'cipie', 'cipą', 'cipę', 'cycki', 'debil', 'doopa', 'dupa', 'dupie', 'dupą', 'dupę', 'dzidzia', 'jebać', 'jebie', 'jebał', 'jebany', 'jebana', 'jebane', 'kurwa', 'kurwy', 'kurwie', 'kurwą', 'kurwę', 'kurwo', 'kutas', 'locha', 'matole', 'menda', 'odpierdol', 'pizda', 'pizdzie', 'pizdą', 'pizdę', 'pizdo', 'pierdolić', 'pierdole', 'pierdoli', 'skurwysyn', 'skurwiel', 'szmata', 'szmaciarz', 'ujebać', 'upierdolić', 'wyjebać', 'wypierdolić', 'zajebać', 'zapierdolić', 'żul'
];

function isProfane(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return FORBIDDEN_WORDS.some(word => lowerText.includes(word));
}

function containsLinks(text) {
    const linkPattern = /https?:\/\/|www\.|[a-z0-9.-]+\.[a-z]{2,}/gi;
    return linkPattern.test(text);
}

export async function GET(request, { params }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const key = `comments:${id}`;

    try {
        const comments = await redis.lrange(key, 0, 49);
        return NextResponse.json(comments || []);
    } catch (error) {
        console.error('Error getting comments:', error);
        return NextResponse.json({ error: 'Failed to get comments' }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    const { id } = params;
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (!id) {
        return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    try {
        // Rate limiting: 5 minutes between comments from same IP
        const rateLimitKey = `rate_limit:comments:${ip}`;
        const isRateLimited = await redis.get(rateLimitKey);

        if (isRateLimited) {
            return NextResponse.json({
                error: 'Zbyt częste dodawanie komentarzy. Odczekaj 5 minut.'
            }, { status: 429 });
        }

        const { text, author } = await request.json();

        if (!text || text.trim().length < 3) {
            return NextResponse.json({ error: 'Komentarz jest za krótki (min. 3 znaki)' }, { status: 400 });
        }

        if (text.length > 500) {
            return NextResponse.json({ error: 'Komentarz jest za długi (max 500 znaków)' }, { status: 400 });
        }

        if (containsLinks(text)) {
            return NextResponse.json({ error: 'Komentarze nie mogą zawierać linków.' }, { status: 400 });
        }

        if (isProfane(text) || isProfane(author)) {
            return NextResponse.json({ error: 'Komentarz lub podpis zawiera niedozwolone słownictwo.' }, { status: 400 });
        }

        const newComment = {
            id: Date.now().toString(),
            text: text.trim(),
            author: author?.trim() || 'Anonim',
            date: new Date().toISOString(),
        };

        const key = `comments:${id}`;

        // Add comment and set rate limit
        await redis.lpush(key, JSON.stringify(newComment));
        await redis.ltrim(key, 0, 99);
        await redis.set(rateLimitKey, '1', { ex: 300 }); // 5 minutes expiration

        return NextResponse.json(newComment);
    } catch (error) {
        console.error('Error submitting comment:', error);
        return NextResponse.json({ error: 'Błąd podczas dodawania komentarza.' }, { status: 500 });
    }
}
