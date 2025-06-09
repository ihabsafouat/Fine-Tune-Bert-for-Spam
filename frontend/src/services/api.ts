import type { Token, Email, EmailCreate, LoginRequest, SignupRequest } from '../types';

const API_URL = 'http://localhost:8000/api/v1';

type Headers = Record<string, string>;

const defaultHeaders: Headers = {
    'Content-Type': 'application/json',
};

const getHeaders = (apiKey?: string): Headers => {
    const headers = { ...defaultHeaders };
    if (apiKey) {
        headers['X-API-Key'] = apiKey;
    }
    return headers;
};

export const api = {
    async login(data: LoginRequest): Promise<Token> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    async signup(data: SignupRequest): Promise<Token> {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Signup failed');
        return response.json();
    },

    async sendEmail(data: EmailCreate, apiKey: string): Promise<Email> {
        const response = await fetch(`${API_URL}/send-email`, {
            method: 'POST',
            headers: getHeaders(apiKey),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to send email');
        return response.json();
    },

    async getSentEmails(apiKey: string): Promise<Email[]> {
        const response = await fetch(`${API_URL}/emails/sent`, {
            headers: getHeaders(apiKey),
        });
        if (!response.ok) throw new Error('Failed to fetch sent emails');
        return response.json();
    },

    async getReceivedEmails(apiKey: string): Promise<Email[]> {
        const response = await fetch(`${API_URL}/emails/received`, {
            headers: getHeaders(apiKey),
        });
        if (!response.ok) throw new Error('Failed to fetch received emails');
        return response.json();
    },

    async getSpamEmails(apiKey: string): Promise<Email[]> {
        const response = await fetch(`${API_URL}/emails/spam`, {
            headers: getHeaders(apiKey),
        });
        if (!response.ok) throw new Error('Failed to fetch spam emails');
        return response.json();
    },
}; 