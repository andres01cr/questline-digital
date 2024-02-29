import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from './redux/store';
import SearchForm from './components/SearchForm';
import SubscriberList from './components/SubscriberList';
import Pagination from './components/Pagination';
import {
  searchSubscribers,
  setPageIndex,
  setSearchTerm,
  setSearchError,
} from './redux/subscribersSlice';

const AppContainer = styled.div`
  text-align: center;
`;

const AppContainerTitle = styled.h1`
  weight: 700;
  font-size: 2.5rem;
  line-height: 3rem;
`;

const AppContainerDescription = styled.h1`
  weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  color: #636363;
  margin-bottom: 3.125rem;
`;

const App: React.FC = () => {
  const { pageIndex, searchTerm } = useSelector(
    (state: RootState) => state.subscribers
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const initialPageIndex = Number(urlSearchParams.get('pageIndex')) || 0;
    const initialSearchTerm = urlSearchParams.get('search') || '';

    dispatch(setPageIndex(initialPageIndex));
    dispatch(setSearchTerm(initialSearchTerm));
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      dispatch(setSearchError({ hasError: false, message: '' }));
      dispatch(searchSubscribers({ pageIndex, searchTerm }));
    } else {
      if (searchTerm !== '') {
        dispatch(
          setSearchError({
            hasError: true,
            message: 'Enter at least 3 characters',
          })
        );
      }
    }
  }, [dispatch, pageIndex, searchTerm]);

  useEffect(() => {
    const updateURL = () => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('pageIndex', String(pageIndex));
      urlSearchParams.set('search', searchTerm);
      const newURL = `?${urlSearchParams}`;

      if (window.location.search !== newURL) {
        window.history.replaceState({}, '', newURL);
      }
    };

    updateURL();
  }, [pageIndex, searchTerm]);

  return (
    <AppContainer>
      <AppContainerTitle>Search</AppContainerTitle>
      <AppContainerDescription>
        Find subscribers by name, email address, or Id
      </AppContainerDescription>
      <SearchForm />
      <SubscriberList />
      <Pagination />
    </AppContainer>
  );
};

export default App;
