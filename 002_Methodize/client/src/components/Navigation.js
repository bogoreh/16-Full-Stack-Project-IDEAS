import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: ${({ theme }) => theme.navBg};
  padding: 1rem 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Navigation = () => {
  return (
    <Nav>
      <NavContent>
        <Logo to="/">Methodize Tasks</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">New Task</NavLink>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};