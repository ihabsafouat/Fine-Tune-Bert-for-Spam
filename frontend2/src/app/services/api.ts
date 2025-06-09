import { AuthResponse, Email, EmailFormData, LoginCredentials, RegisterCredentials } from '../types';

const API_URL = 'http://localhost:8000';

const getHeaders = (apiKey?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['X-API-Key'] = apiKey;
  }
  return headers;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
};

export const getReceivedEmails = async (apiKey: string): Promise<Email[]> => {
  const response = await fetch(`${API_URL}/emails/received`, {
    headers: getHeaders(apiKey),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch received emails');
  }
  return response.json();
};

export const getSentEmails = async (apiKey: string): Promise<Email[]> => {
  const response = await fetch(`${API_URL}/emails/sent`, {
    headers: getHeaders(apiKey),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sent emails');
  }
  return response.json();
};

export const sendEmail = async (apiKey: string, emailData: EmailFormData): Promise<void> => {
  const response = await fetch(`${API_URL}/emails/send`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(emailData),
  });
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
}; 