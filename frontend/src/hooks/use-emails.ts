import { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { useApp } from '../contexts/AppContext';
import { useToast } from './use-toast';
import type { Email } from '../types';

export function useEmails() {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchEmails = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const [sent, received, spam] = await Promise.all([
        api.getSentEmails(),
        api.getReceivedEmails(),
        api.getSpamEmails(),
      ]);
      dispatch({ type: 'SET_EMAILS', payload: { sent, received, spam } });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch emails',
      });
      toast({
        title: 'Error',
        description: 'Failed to fetch emails. Please try again.',
        variant: 'destructive',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      setIsRefreshing(false);
    }
  }, [dispatch, toast]);

  // Initial fetch and when dependencies change
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const refreshEmails = () => {
    setIsRefreshing(true);
    fetchEmails();
  };

  const markAsSpam = async (emailId: number) => {
    try {
      await api.markAsSpam(emailId);
      toast({
        title: 'Success',
        description: 'Email marked as spam.',
      });
      fetchEmails();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to mark as spam',
        variant: 'destructive',
      });
    }
  };

  const markAsNotSpam = async (emailId: number) => {
    try {
      await api.markAsNotSpam(emailId);
      toast({
        title: 'Success',
        description: 'Email marked as not spam.',
      });
      fetchEmails();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to mark as not spam',
        variant: 'destructive',
      });
    }
  };

  // When returning, filter based on state.activeTab
  let emails: Email[] = [];
  switch (state.activeTab) {
    case 'inbox':
      emails = state.receivedEmails;
      break;
    case 'sent':
      emails = state.sentEmails;
      break;
    case 'spam':
      emails = state.spamEmails;
      break;
    case 'important':
      emails = state.receivedEmails.filter(email =>
        email.subject.toLowerCase().includes('important') ||
        email.subject.includes('!')
      );
      break;
  }

  // Apply search filter if there's a search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    emails = emails.filter(email => 
      email.subject.toLowerCase().includes(query) ||
      email.content.toLowerCase().includes(query) ||
      email.sender_email.toLowerCase().includes(query) ||
      email.recipient_email.toLowerCase().includes(query)
    );
  }
  
  // Apply date filters if set
  if (state.filters.dateRange.start || state.filters.dateRange.end) {
    emails = emails.filter(email => {
      const emailDate = new Date(email.created_at);
      const startDate = state.filters.dateRange.start;
      const endDate = state.filters.dateRange.end;
      
      if (startDate && endDate) {
        return emailDate >= startDate && emailDate <= endDate;
      } else if (startDate) {
        return emailDate >= startDate;
      } else if (endDate) {
        return emailDate <= endDate;
      }
      return true;
    });
  }
  
  // Sort emails by date (newest first)
  emails.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    emails,
    isLoading: state.isLoading,
    error: state.error,
    isRefreshing,
    refreshEmails,
    markAsSpam,
    markAsNotSpam,
  };
}