/**
 * API Helper for AI Learning Platform
 * Handles all API requests with automatic JWT token inclusion
 */

const API_BASE = "/api";
/**
 * Generic API request handler with automatic JWT token inclusion
 */
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        // Check if body is FormData
        const isFormData = options.body instanceof FormData;

        // Build headers
        const headers: Record<string, string> = {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...(options.headers as Record<string, string> || {})
        };

        const url = `${API_BASE}${endpoint}`;

        // Detailed logging
        console.log('=== API REQUEST ===');
        console.log('URL:', url);
        console.log('Method:', options.method || 'GET');
        console.log('Has Token:', !!token);
        console.log('==================');

        const response = await fetch(url, {
            ...options,
            headers,
        });

        console.log('=== API RESPONSE ===');
        console.log('Status:', response.status);
        console.log('OK:', response.ok);
        console.log('===================');

        if (!response.ok) {
            const text = await response.text();
            console.error(`API Error: ${response.status} ${text}`);
            throw new Error(`API Error: ${response.status} ${text}`);
        }

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {} as T;
        }

        return await response.json();
    } catch (error) {
        console.error("=== API REQUEST FAILED ===");
        console.error("Error:", error);
        console.error("Error type:", error instanceof TypeError ? 'TypeError (Network issue - Backend not reachable)' : 'Other error');
        if (error instanceof TypeError) {
            console.error("SOLUTION: Make sure backend is running on http://localhost:8000");
            console.error("Run: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload");
        }
        console.error("==========================");
        throw error;
    }
}

/**
 * Authentication API
 */
export const authAPI = {
    login: async (email: string, password: string) => {
        return apiRequest<{ access_token: string; token_type: string }>(
            '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }
        );
    },

    register: async (email: string, password: string, persona: string) => {
        return apiRequest<{ access_token: string; token_type: string }>(
            '/auth/register',
            {
                method: 'POST',
                body: JSON.stringify({ email, password, persona }),
            }
        );
    },

    getProfile: async () => {
        return apiRequest<{
            id: number;
            email: string;
            persona: string;
            learning_style: string;
            preferred_language: string;
        }>('/auth/profile');
    },
};

/**
 * Alias for apiRequest - for backward compatibility
 * All requests automatically include JWT token if available
 */
export const authenticatedRequest = apiRequest;

/**
 * Backward compatibility functions for login/register
 * These functions store the token automatically for backward compatibility
 */
export async function loginUser(email: string, password: string) {
    const response = await authAPI.login(email, password);
    // Store token in localStorage for backward compatibility
    if (typeof window !== 'undefined' && response.access_token) {
        localStorage.setItem('token', response.access_token);
    }
    return response;
}

export async function registerUser(email: string, password: string, persona: string) {
    const response = await authAPI.register(email, password, persona);
    // Store token in localStorage for backward compatibility
    if (typeof window !== 'undefined' && response.access_token) {
        localStorage.setItem('token', response.access_token);
    }
    return response;
}

export default apiRequest;
