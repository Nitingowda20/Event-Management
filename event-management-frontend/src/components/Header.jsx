import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setDropdownVisible(false); // Close the dropdown on sign out
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <LogoWrapper to="/" className="logo">
        <Logo>EVEnT_oR🌐👨🏻‍💻</Logo>
      </LogoWrapper>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton>
          <AiOutlineSearch />
        </SearchButton>
      </SearchForm>

      <NavLinks>
        <NavLink to="/" isActive={path === "/"}>
          Home
        </NavLink>
        <NavLink to="/create-event" isActive={path === "/create-event"}>
          Create Event
        </NavLink>
      </NavLinks>

      <RightSection>
        {currentUser ? (
          <UserSection>
            <Username onClick={toggleDropdown}>
              @{currentUser.username}
            </Username>
            {dropdownVisible && (
              <Dropdown>
                <DropdownItem onClick={handleSignOut}>
                  <Link to="/login">Sign Out</Link>
                </DropdownItem>
              </Dropdown>
            )}
          </UserSection>
        ) : (
          <Link to="/login">
            <SignInButton>Sign-In</SignInButton>
          </Link>
        )}
      </RightSection>
    </HeaderContainer>
  );
}

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;
  background-color: #fff;
  color: #000;
  border-bottom: 2px solid #ccc;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 10px;
  }
`;

const LogoWrapper = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4fd1c5;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: 32px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 15px;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 250px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4fd1c5;
  font-size: 1.2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 768px) {
    margin-top: 15px;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  color: ${({ isActive }) => (isActive ? "#4fd1c5" : "#333")};
  text-decoration: none;
  &:hover {
    color: #4fd1c5;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const UserSection = styled.div`
  position: relative;
`;

const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #4fd1c5;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const SignInButton = styled.button`
  background-color: #4fd1c5;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #38b2ac;
  }
`;
