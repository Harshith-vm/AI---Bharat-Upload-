/**
 * Authentication Utility Functions
 * Handles token management and authentication checks
 */

/**
 * Get JWT token from localStorage
 * @returns JWT token string or null if not found
 */
export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

/**
 * Check if user is authenticated
 * @returns true if token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

/**
 * Logout user by removing token and redirecting to login
 */
export const logout = (): void => {
    if (typeof window === 'undefined') return;

    // Remove token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/login';
};

/**
 * Set JWT token in localStorage
 * @param token - JWT token string
 */
export const setToken = (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
};

/**
 * Clear all authentication data
 */
export const clearAuth = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
};
