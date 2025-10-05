import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.surface} 100%);
  padding: ${({ theme }) => theme.spacing.md};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
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

const Login: React.FC = () => {
  return (
    <PageContainer>
      <BackLink to="/">
        ← Back to Portfolio
      </BackLink>
      <LoginForm />
    </PageContainer>
  );
};

export default Login;
