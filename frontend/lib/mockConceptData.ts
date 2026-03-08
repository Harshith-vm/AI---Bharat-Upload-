export const mockConcept = {
    concept: "Recursion",
    explanation: "Recursion is when a function calls itself.",

    keyIdeas: [
        "Base case prevents infinite recursion",
        "Recursive case calls itself with smaller input",
        "Uses call stack memory"
    ],

    examples: [
        "Calculating factorial using recursion",
        "Generating Fibonacci numbers",
        "Traversing a binary tree"
    ],

    commonMistakes: [
        {
            mistake: "Forgetting to define a base case",
            correction: "Always define a stopping condition before recursive call."
        },
        {
            mistake: "Incorrect recursive step",
            correction: "Ensure each recursive call moves closer to the base case."
        },
        {
            mistake: "Deep recursion causing stack overflow",
            correction: "Use iteration or tail recursion when possible."
        }
    ],

    prerequisites: ["Functions", "Base case", "Call stack"],
};

export async function mockConceptAsync() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockConcept), 500);
    });
}