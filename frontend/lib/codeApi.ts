import { apiRequest } from './api';

export interface CodeSession {
    session_id: string;
    language: string;
    message: string;
}

export interface CodeExplanationResponse {
    explanation: string;
}

export interface CodeImprovementResponse {
    improvements: string;
}

export interface ComplexityResponse {
    time_complexity: string;
    space_complexity: string;
    justification: string;
}

export interface CodeRefactorResponse {
    refactored_code: string;
}

export interface StepwiseExplanationResponse {
    stepwise_explanation: string;
}

export interface ArchitectureAnalysisResponse {
    architecture_analysis: string;
}

export interface RefactorImpactResponse {
    original_time_complexity: string;
    refactored_time_complexity: string;
    improvement_summary: string;
}

export interface CodeQualityResponse {
    readability: number;
    efficiency: number;
    maintainability: number;
    overall: number;
    summary: string;
}

/**
 * Submit code and create a session
 */
export async function submitCode(code: string, language: string = "javascript"): Promise<CodeSession> {
    return apiRequest<CodeSession>("/code", {
        method: "POST",
        body: JSON.stringify({ code, language }),
    });
}

/**
 * Get code explanation
 */
export async function explainCode(sessionId: string): Promise<CodeExplanationResponse> {
    return apiRequest<CodeExplanationResponse>(`/code/explain/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Get code improvements
 */
export async function improveCode(sessionId: string): Promise<CodeImprovementResponse> {
    return apiRequest<CodeImprovementResponse>(`/code/improve/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Analyze code complexity
 */
export async function analyzeComplexity(sessionId: string): Promise<ComplexityResponse> {
    return apiRequest<ComplexityResponse>(`/code/complexity/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Refactor code
 */
export async function refactorCode(sessionId: string): Promise<CodeRefactorResponse> {
    return apiRequest<CodeRefactorResponse>(`/code/refactor/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Get stepwise code explanation
 */
export async function getStepwiseExplanation(sessionId: string): Promise<StepwiseExplanationResponse> {
    return apiRequest<StepwiseExplanationResponse>(`/code/stepwise/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Get architecture analysis
 */
export async function getArchitectureAnalysis(sessionId: string): Promise<ArchitectureAnalysisResponse> {
    return apiRequest<ArchitectureAnalysisResponse>(`/code/architecture/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Get refactor impact comparison
 */
export async function getRefactorImpact(sessionId: string): Promise<RefactorImpactResponse> {
    return apiRequest<RefactorImpactResponse>(`/code/refactor-impact/${sessionId}`, {
        method: "POST",
    });
}

/**
 * Get code quality evaluation
 */
export async function getCodeQuality(sessionId: string): Promise<CodeQualityResponse> {
    return apiRequest<CodeQualityResponse>(`/code/quality/${sessionId}`, {
        method: "POST",
    });
}
