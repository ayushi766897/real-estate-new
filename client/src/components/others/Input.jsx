// src/components/Input.jsx
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to /properties with the search term as query parameter "search"
    navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <StyledWrapper>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Search properties by location..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search {
    display: inline-block;
    position: relative;
  }
  .search input[type="text"] {
    width: 200px;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .search button[type="submit"] {
    background-color: #4e99e9;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.9s ease;
  }
  .search button[type="submit"]:hover {
    transform: scale(1.1);
    color: rgb(255, 255, 255);
    background-color: blue;
  }
`;

export default Input;
