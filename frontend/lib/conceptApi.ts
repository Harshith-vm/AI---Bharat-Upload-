const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ConceptResponse {
    concept: string;
    explanation: string;
    key_ideas: string[];
    examples: string[];
    common_mistakes: {
        mistake: string;
        correction: string;
    }[];
    prerequisites: string[];
}

/**
 * Explain a concept using the backend API
 */
export async function explainConcept(
    concept: string,
    persona?: string
): Promise<ConceptResponse> {
    const url = persona
        ? `${API_BASE_URL}/concept/explain?persona=${persona}`
        : `${API_BASE_URL}/concept/explain`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ concept }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to explain concept");
    }

    return response.json();
}
