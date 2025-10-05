import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useJournal } from '../../hooks/useJournal';

const PageContainer = styled.div`
  max-width: 1200px;
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

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
`;

const CreateButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EntriesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;

const EntryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.fast}, 
              box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const EntryTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const EntryContent = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EntryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EntryDate = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const EntryMood = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const EntryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const EntryActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.textLight};
`;

const JournalList: React.FC = () => {
  const { entries, loading, error } = useJournal();
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  // Filter entries based on search term and mood
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = !moodFilter || entry.mood === moodFilter;
    
    return matchesSearch && matchesMood;
  });

  // Get unique moods for filter
  const moods = Array.from(new Set(entries.map(entry => entry.mood).filter(Boolean)));

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner>Loading your journal entries...</LoadingSpinner>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <EmptyState>
          <h2>Error loading journal entries</h2>
          <p>{error}</p>
          <p>If you're not signed in, please <Link to="/login" style={{ color: '#ff6b35' }}>sign in</Link> first.</p>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>My Journal</Title>
        <CreateButton to="/journal/new">
          + New Entry
        </CreateButton>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={moodFilter}
          onChange={(e) => setMoodFilter(e.target.value)}
        >
          <option value="">All Moods</option>
          {moods.map(mood => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </FilterSelect>
      </SearchContainer>

      {filteredEntries.length === 0 ? (
        <EmptyState>
          <h2>No journal entries found</h2>
          <p>
            {searchTerm || moodFilter 
              ? 'Try adjusting your search or filters.'
              : 'Start writing your first journal entry!'
            }
          </p>
          {!searchTerm && !moodFilter && (
            <CreateButton to="/journal/new" style={{ marginTop: '1rem' }}>
              Create Your First Entry
            </CreateButton>
          )}
        </EmptyState>
      ) : (
        <EntriesGrid>
          {filteredEntries.map(entry => (
            <EntryCard key={entry.id}>
              <EntryTitle>{entry.title}</EntryTitle>
              <EntryMeta>
                <EntryDate>
                  {new Date(entry.created_at).toLocaleDateString()}
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
              <EntryActions>
                <ActionLink to={`/journal/${entry.id}`}>
                  Read More
                </ActionLink>
                <ActionLink to={`/journal/${entry.id}/edit`}>
                  Edit
                </ActionLink>
              </EntryActions>
            </EntryCard>
          ))}
        </EntriesGrid>
      )}
    </PageContainer>
  );
};

export default JournalList;
