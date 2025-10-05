import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;

  @media (max-width: 768px) {
    top: 15px;
    padding: 0 15px;
    max-width: calc(100% - 30px);
  }
`;

const Nav = styled.nav`
  background-color: #1a1a1a;
  border: 1px solid #404040;
  border-radius: 50px;
  padding: 16px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 12px 24px;
    gap: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: #e5e5e5;
  text-decoration: none;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  ${({ $isActive }) => $isActive && `
    color: #ffffff;
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoginDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LoginButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  color: #e5e5e5;
  font-weight: 400;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  ${({ $isOpen }) => $isOpen && `
    color: #ffffff;
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DropdownArrow = styled.span<{ $isOpen: boolean }>`
  font-size: 12px;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const LoginDropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #1a1a1a;
  border: 1px solid #404040;
  border-radius: 12px;
  padding: 8px 0;
  min-width: 160px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  z-index: 1000;
`;

const LoginDropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 16px;
  color: #e5e5e5;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #ffffff;
  }
`;

const LoginDropdownLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 16px;
  color: #e5e5e5;
  text-decoration: none;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #ffffff;
  }
`;



const Header: React.FC = () => {
  const location = useLocation();
  const { user, signOut, clearAuth } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Simple debug logging
  console.log('Header render - user exists:', !!user);
  if (user) {
    console.log('Header render - user email:', user.email);
  }

  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const closeLoginMenu = () => {
    setIsLoginOpen(false);
  };

  const handleSignOut = async () => {
    console.log('🚪 Header: Signing out...');
    await signOut();
    console.log('✅ Header: Sign out completed');
    closeLoginMenu();
  };


  return (
    <HeaderContainer>
      <Nav>
        <NavLinks>
          <NavLink to="/" $isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/projects" $isActive={location.pathname === '/projects'}>
            Projects
          </NavLink>
          <NavLink to="/about" $isActive={location.pathname === '/about'}>
            About
          </NavLink>
          {user && (
            <NavLink 
              to="/journal" 
              $isActive={location.pathname.startsWith('/journal')}
            >
              Journal
            </NavLink>
          )}
          
          <LoginDropdownContainer>
            <LoginButton 
              $isOpen={isLoginOpen}
              onClick={toggleLoginMenu}
              onMouseEnter={() => setIsLoginOpen(true)}
              onMouseLeave={() => setIsLoginOpen(false)}
            >
              Login <DropdownArrow $isOpen={isLoginOpen}>▼</DropdownArrow>
            </LoginButton>
            
            <LoginDropdownMenu 
              $isOpen={isLoginOpen}
              onMouseEnter={() => setIsLoginOpen(true)}
              onMouseLeave={() => setIsLoginOpen(false)}
            >
              {!user ? (
                <>
                  <LoginDropdownLink to="/login" onClick={closeLoginMenu}>
                    Sign In
                  </LoginDropdownLink>
                  <LoginDropdownLink to="/register" onClick={closeLoginMenu}>
                    Sign Up
                  </LoginDropdownLink>
                </>
              ) : (
                <LoginDropdownItem onClick={handleSignOut}>
                  Sign Out
                </LoginDropdownItem>
              )}
            </LoginDropdownMenu>
          </LoginDropdownContainer>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
