export interface User {
  id: number;
  email: string;
  apiKey: string;
}

export interface Email {
  id: number;
  subject: string;
  content: string;
  sender_email: string;
  recipient_email: string;
  created_at: string;
  read: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface EmailFormData {
  recipient: string;
  subject: string;
  content: string;
} 