import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { asset } = await request.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'GROQ API key not configured' }, { status: 500 });
        }

        const prompt = `
            As an Urban Infrastructure Emergency Response AI, suggest detailed measures for the following incident:
            - Asset: ${asset.name}
            - Type: ${asset.asset_type}
            - Location: ${asset.location}
            - Current State: ${asset.status}
            - Health: ${asset.progress}%
            - Priority Score: ${asset.priority_score}

            Provide a professional response including:
            1. Response Level (Immediate/High/Normal)
            2. Detailed Mitigation Steps
            3. Resource Allocation (Types of machinery, crew size)
            4. Estimated Time Span
            5. Safety Protocols

            Keep the tone authoritative, technical, and concise. 
            IMPORTANT: Do NOT use any markdown formatting. No bold (**), no headers (#). 
            Use simple plain text for structure. Group information logically with line breaks.
        `;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0]?.message?.content || 'Unable to generate response.';

        return NextResponse.json({ response: aiMessage });
    } catch (error) {
        console.error('AI Response Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
