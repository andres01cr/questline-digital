import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchTerm, setPageIndex } from '../redux/subscribersSlice';
import { RootState } from '../redux/store';

const FormContainer = styled.div`
  margin-bottom: 1.25rem;
`;

const Input = styled.input`
  padding: 1rem 1.5rem 1rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  margin-right: 0.625rem;
  background-color: #f5f5f5;
  width: 31.25rem;
  color: #636363;
  border: none;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: 1rem;
  background-color: #111111;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-image: url('assets/img/search.svg');
  background-repeat: no-repeat;
  color: #ffffff;
  vertical-align: middle;
  width: 3rem;
  height: 3rem;
  background-position: 1rem 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const ErrorMessage = styled.div`
  color: rgba(210, 18, 18, 1);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
  margin-top: 0.625rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Loading = styled.div`
  font-size: 1rem;
  color: rgba(99, 99, 99, 1);
  margin-top: 2.5rem;
`;

const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showError, setShowError] = useState(false);

  const searchCount = search.length;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const loading: boolean = useSelector(
    (state: RootState) => state.subscribers.loading
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length >= 3) {
      setShowError(false);
      dispatch(setSearchTerm(search));
      dispatch(setPageIndex(0));
    } else {
      setShowError(true);
    }
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
        <Button type="submit" />
      </form>
      {showError && <ErrorMessage>Enter at least 3 characters</ErrorMessage>}
      {loading && <Loading>Loading...</Loading>}
    </FormContainer>
  );
};

export default SearchForm;
