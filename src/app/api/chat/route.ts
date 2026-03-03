import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages, system_prompt } = await req.json();

        const apiKey = "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";

        const apiMessages: any[] = [];
        if (system_prompt) {
            apiMessages.push({ role: "system", content: system_prompt });
        }
        apiMessages.push(...messages);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: apiMessages,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: "No response from AI", details: errorText }, { status: response.status });
        }

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            return NextResponse.json({ reply: data.choices[0].message.content });
        }

        return NextResponse.json({ error: "Empty choices", details: data }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
