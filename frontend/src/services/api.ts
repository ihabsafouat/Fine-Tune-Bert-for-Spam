import axios from 'axios';
import type { Token, Email, EmailCreate, LoginRequest, SignupRequest } from '../types';

const API_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle specific error codes
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401 && !originalRequest._retry) {
        // Clear local storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('apiKey');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
      
      // Return the error message from the server if available
      if (error.response.data && error.response.data.detail) {
        return Promise.reject(new Error(error.response.data.detail));
      }
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  async login(data: LoginRequest): Promise<Token> {
    try {
      const response = await apiClient.post('/login', data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error('Login failed');
    }
  },

  async signup(data: SignupRequest): Promise<Token> {
    try {
      const response = await apiClient.post('/signup', data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Signup failed: ${error.message}`);
      }
      throw new Error('Signup failed');
    }
  },

  async sendEmail(data: EmailCreate): Promise<Email> {
    try {
      const response = await apiClient.post('/send-email', data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error('Failed to send email');
    }
  },

  async getSentEmails(): Promise<Email[]> {
    try {
      const response = await apiClient.get('/emails/sent');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch sent emails: ${error.message}`);
      }
      throw new Error('Failed to fetch sent emails');
    }
  },

  async getReceivedEmails(): Promise<Email[]> {
    try {
      const response = await apiClient.get('/emails/received');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch received emails: ${error.message}`);
      }
      throw new Error('Failed to fetch received emails');
    }
  },

  async getSpamEmails(): Promise<Email[]> {
    try {
      const response = await apiClient.get('/emails/spam');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch spam emails: ${error.message}`);
      }
      throw new Error('Failed to fetch spam emails');
    }
  },

  // New methods
  async markAsSpam(emailId: number): Promise<void> {
    try {
      await apiClient.post(`/emails/${emailId}/mark-spam`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to mark email as spam: ${error.message}`);
      }
      throw new Error('Failed to mark email as spam');
    }
  },

  async markAsNotSpam(emailId: number): Promise<void> {
    try {
      await apiClient.post(`/emails/${emailId}/mark-not-spam`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to mark email as not spam: ${error.message}`);
      }
      throw new Error('Failed to mark email as not spam');
    }
  },
};