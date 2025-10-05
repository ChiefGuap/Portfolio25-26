import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJournal } from '../../hooks/useJournal';
import { JournalEntry } from '../../services/supabase';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const EntryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const EntryTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const EntryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EntryDate = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const EntryMood = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const EntryContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: pre-wrap;
`;

const EntryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.error};
`;

const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEntry, deleteEntry } = useJournal();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleDelete = async () => {
    if (!entry || !window.confirm('Are you sure you want to delete this journal entry?')) {
      return;
    }

    try {
      await deleteEntry(entry.id);
      navigate('/journal');
    } catch (err) {
      console.error('Error deleting journal entry:', err);
      alert('Failed to delete journal entry');
    }
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
        <ErrorMessage>
          <h2>Error loading journal entry</h2>
          <p>{error || 'Journal entry not found'}</p>
          <BackLink to="/journal">← Back to Journal</BackLink>
        </ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <BackLink to="/journal">
          ← Back to Journal
        </BackLink>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ActionButton to={`/journal/${entry.id}/edit`}>
            Edit Entry
          </ActionButton>
          <ActionButton 
            to="#" 
            onClick={handleDelete}
            style={{ backgroundColor: '#ef4444' }}
          >
            Delete Entry
          </ActionButton>
        </div>
      </Header>

      <EntryCard>
        <EntryTitle>{entry.title}</EntryTitle>
        
        <EntryMeta>
          <EntryDate>
            {new Date(entry.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </EntryDate>
          {entry.mood && <EntryMood>{entry.mood}</EntryMood>}
        </EntryMeta>

        <EntryContent>{entry.content}</EntryContent>

        {entry.tags && entry.tags.length > 0 && (
          <EntryTags>
            {entry.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </EntryTags>
        )}
      </EntryCard>
    </PageContainer>
  );
};

export default JournalDetail;
