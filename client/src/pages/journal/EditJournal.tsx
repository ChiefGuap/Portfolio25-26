import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useJournal } from '../../hooks/useJournal';
import { JournalEntry } from '../../services/supabase';
import JournalForm from '../../components/journal/JournalForm';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const EditJournal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntry, updateEntry } = useJournal();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        setError('No entry ID provided');
        setLoading(false);
        return;
      }

      try {
        const entryData = await getEntry(id);
        setEntry(entryData);
      } catch (err) {
        setError('Failed to load journal entry');
        console.error('Error fetching journal entry:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id, getEntry]);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
    is_private: boolean;
  }) => {
    if (!entry) return;

    setSaving(true);
    try {
      await updateEntry(entry.id, data);
      navigate('/journal');
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/journal');
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner>Loading journal entry...</LoadingSpinner>
      </PageContainer>
    );
  }

  if (error || !entry) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Error loading journal entry</h2>
          <p>{error || 'Journal entry not found'}</p>
          <button onClick={() => navigate('/journal')}>Back to Journal</button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <JournalForm
        initialData={{
          title: entry.title,
          content: entry.content,
          mood: entry.mood || '',
          tags: entry.tags || [],
          is_private: entry.is_private,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />
    </PageContainer>
  );
};

export default EditJournal;
