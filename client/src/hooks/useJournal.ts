import { useState, useEffect, useCallback } from 'react';
import { supabase, JournalEntry } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all journal entries for the current user
  const fetchEntries = useCallback(async () => {
    console.log('fetchEntries called, user:', user);
    
    if (!user) {
      console.log('No user found, setting empty entries');
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching journal entries for user:', user.id);

      console.log('About to make Supabase query...');
      
      // Check current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log('Current session for query:', sessionData.session?.user?.id);
      console.log('Session error:', sessionError);
      
      if (!sessionData.session) {
        console.log('No active session found');
        setError('No active session - please sign in');
        setLoading(false);
        return;
      }
      
      // Add timeout to prevent hanging
      const queryPromise = supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 10000)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      console.log('Supabase response received:', { data, error });
      
      if (data) {
        console.log('Data length:', data.length);
        console.log('First entry:', data[0]);
      }

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
      } else {
        console.log('Setting entries:', data);
        setEntries(data || []);
      }
    } catch (err) {
      console.error('Caught error:', err);
      setError('Failed to fetch journal entries');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  }, [user]);

  // Create a new journal entry
  const createEntry = async (entryData: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
    is_private?: boolean;
  }) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            ...entryData,
            user_id: user.id,
            is_private: entryData.is_private ?? true,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Add to local state
      setEntries(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating journal entry:', err);
      throw err;
    }
  };

  // Update an existing journal entry
  const updateEntry = async (id: string, updates: {
    title?: string;
    content?: string;
    mood?: string;
    tags?: string[];
    is_private?: boolean;
  }) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setEntries(prev => 
        prev.map(entry => entry.id === id ? data : entry)
      );
      return data;
    } catch (err) {
      console.error('Error updating journal entry:', err);
      throw err;
    }
  };

  // Delete a journal entry
  const deleteEntry = async (id: string) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error('Error deleting journal entry:', err);
      throw err;
    }
  };

  // Get a specific journal entry
  const getEntry = async (id: string) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching journal entry:', err);
      throw err;
    }
  };

  // Fetch entries when user changes
  useEffect(() => {
    console.log('useJournal useEffect triggered, user:', user?.id);
    fetchEntries();
  }, [fetchEntries, user?.id]); // Include both dependencies

  return {
    entries,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntry,
    refetch: fetchEntries,
  };
};
