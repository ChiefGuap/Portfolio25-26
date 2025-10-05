import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
  font-weight: 600;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  padding: 10px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TestSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const TestButton = styled.button`
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease;
`;

const TestCredentials = styled.div`
  font-family: monospace;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 12px;
`;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    console.log('🚀 Submitting login form...');
    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message || 'Sign in failed');
      console.error('❌ Login failed:', signInError.message);
    } else {
      console.log('✅ Login successful! You are now signed in.');
      // Don't redirect - let the auth state change handle navigation
    }
  };


  const clearForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
    console.log('🧹 Form cleared');
  };

  return (
    <FormContainer>
      <Title>Sign In</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your email"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your password"
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Form>

      <LinkText>
        Don't have an account? <Link to="/register">Sign up</Link>
      </LinkText>

      <TestSection>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#495057' }}>
          🧪 Testing Tools
        </h4>
        
        <div>
          <strong>Working Test Account:</strong>
          <TestCredentials>
            Email: rmalam@ucdavis.edu<br/>
            Password: test123<br/>
            Status: ✅ Created & Ready
          </TestCredentials>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
          <TestButton
            onClick={() => {
              setEmail('rmalam@ucdavis.edu');
              setPassword('test123');
              console.log('🧪 Test credentials loaded');
            }}
            style={{ backgroundColor: '#28a745', color: 'white' }}
          >
            🧪 Use Test Account
          </TestButton>
          
          <TestButton
            onClick={clearForm}
            style={{ backgroundColor: '#6c757d', color: 'white' }}
          >
            🧹 Clear Form
          </TestButton>
        </div>

        <div style={{ marginTop: '15px', fontSize: '12px', color: '#6c757d' }}>
          <strong>Note:</strong> Enter your actual password for rmalam@ucdavis.edu to sign in.
        </div>
      </TestSection>
    </FormContainer>
  );
};

export default LoginForm;