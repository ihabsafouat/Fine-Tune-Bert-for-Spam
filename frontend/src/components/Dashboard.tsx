import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import axios from 'axios';

interface CheckResult {
  is_spam: boolean;
  confidence: number;
  message: string;
}

const Dashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const apiKey = localStorage.getItem('api_key');
    if (!apiKey) {
      setError('API key not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/check-email', {
        sender: email,
        recipient: "user@example.com", // Required by the API
        subject: subject,
        content: body, // Note: API expects 'content' not 'body'
      }, {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      });

      setResult(response.data);
    } catch (err) {
      setError('Failed to check email. Please try again.');
      console.error('Error checking email:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Spam Detection Dashboard
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
            placeholder="Enter sender's email address"
          />

          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            sx={{ mb: 2 }}
            placeholder="Enter email subject"
          />

          <TextField
            fullWidth
            label="Email Body"
            variant="outlined"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 3 }}
            placeholder="Enter email content"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mb: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Check for Spam'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color={result.is_spam ? 'error' : 'success'}>
                      {result.is_spam ? '⚠️ Spam Detected' : '✓ Legitimate Email'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Confidence: {(result.confidence * 100).toFixed(2)}%
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {result.message}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard; 