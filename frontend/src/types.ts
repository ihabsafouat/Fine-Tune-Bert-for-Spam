interface User {
    email: string;
    api_key: string;
}

interface Token {
    access_token: string;
    token_type: string;
    api_key: string;
    email?: string;
}

interface Email {
    id: number;
    subject: string;
    content: string;
    sender_email: string;
    recipient_email: string;
    is_spam: boolean;
    spam_confidence: number;
    created_at: string;
}

interface EmailCreate {
    recipient_email: string;
    subject: string;
    content: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    email: string;
    password: string;
}

export type {
    User,
    Token,
    Email,
    EmailCreate,
    LoginRequest,
    SignupRequest
}; 