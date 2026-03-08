export const mockConcept = {
    concept: "Recursion",
    explanation: "Recursion is when a function calls itself.",
    prerequisites: ["Functions", "Base Case", "Stack"]
}

export async function mockConceptAsync() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockConcept), 500)
    })
}

