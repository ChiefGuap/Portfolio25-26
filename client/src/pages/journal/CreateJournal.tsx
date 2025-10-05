import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useJournal } from '../../hooks/useJournal';
import JournalForm from '../../components/journal/JournalForm';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const CreateJournal: React.FC = () => {
  const navigate = useNavigate();
  const { createEntry } = useJournal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
    is_private: boolean;
  }) => {
    setLoading(true);
    try {
      await createEntry(data);
      navigate('/journal');
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/journal');
  };

  return (
    <PageContainer>
      <JournalForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </PageContainer>
  );
};

export default CreateJournal;
