import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSearchTerm } from '../redux/subscribersSlice';

const FormContainer = styled.div`
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  padding: 1rem 1.5rem 1rem 1.5rem;
  font-size: 1rem;
  border-radius: .5rem;
  margin-right: .625rem;
  background-color: #F5F5F5;
  width: 31.25rem;
  color: #636363;
  border: none;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  background-color: #111111;
  border-radius: .5rem;
  border: none;
  cursor: pointer;
  background-image: url('assets/img/search.svg');
  background-repeat: no-repeat;
  color: #FFFFFF;
  vertical-align: middle;
  width: 3rem;
  height: 3rem;
  background-position: 1rem 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <Button type="submit"/>
      </form>
    </FormContainer>
  );
};

export default SearchForm;