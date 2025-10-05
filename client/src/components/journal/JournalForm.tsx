import React, { useState } from 'react';
import styled from 'styled-components';
import { JournalEntry } from '../../services/supabase';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: white;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagInput = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0;
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ variant, theme }) => 
    variant === 'secondary' 
      ? `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};

        &:hover {
          background-color: ${theme.colors.primary};
          color: white;
        }
      `
      : `
        background-color: ${theme.colors.primary};
        color: white;

        &:hover {
          background-color: ${theme.colors.primaryDark};
        }
      `
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textLight};
    color: white;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

interface JournalFormProps {
  initialData?: Partial<JournalEntry>;
  onSubmit: (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
    is_private: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const moods = [
  '😊 Happy',
  '😔 Sad',
  '😰 Anxious',
  '😴 Tired',
  '😤 Frustrated',
  '😌 Peaceful',
  '🤔 Contemplative',
  '😍 Excited',
  '😌 Content',
  '😟 Worried',
];

const JournalForm: React.FC<JournalFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    mood: initialData?.mood || '',
    tags: initialData?.tags || [],
    is_private: initialData?.is_private ?? true,
  });
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      const tag = newTag.trim().toLowerCase();
      if (!formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag],
        }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood: formData.mood || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        is_private: formData.is_private,
      });
    } catch (err) {
      setError('Failed to save journal entry');
      console.error('Error submitting journal entry:', err);
    }
  };

  return (
    <FormContainer>
      <Title>{initialData ? 'Edit Journal Entry' : 'New Journal Entry'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's on your mind?"
            required
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Content</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts, feelings, experiences..."
            required
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="mood">Mood (Optional)</Label>
          <Select
            id="mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select a mood...</option>
            {moods.map(mood => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">Tags (Optional)</Label>
          <TagInput
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add a tag and press Enter"
            disabled={loading}
          />
          {formData.tags.length > 0 && (
            <TagContainer>
              {formData.tags.map(tag => (
                <Tag key={tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </Tag>
              ))}
            </TagContainer>
          )}
        </FormGroup>

        <FormGroup>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="is_private"
              name="is_private"
              checked={formData.is_private}
              onChange={handleChange}
              disabled={loading}
            />
            <Label htmlFor="is_private">Keep this entry private</Label>
          </CheckboxContainer>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update Entry' : 'Save Entry'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default JournalForm;
