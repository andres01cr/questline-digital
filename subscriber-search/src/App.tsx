import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, AppDispatch } from "./redux/store";
import SearchForm from "./components/SearchForm";
import SubscriberList from "./components/SubscriberList";
import Pagination from "./components/Pagination";
import { searchSubscribers } from "./redux/subscribersSlice";

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
    if (searchTerm.length >= 3 || searchTerm === "") {
      dispatch(searchSubscribers({ pageIndex, searchTerm }));
    }

    const updateURL = () => {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set("pageIndex", String(pageIndex));
      urlSearchParams.set("search", searchTerm);
      window.history.replaceState({}, "", `?${urlSearchParams}`);
    };

    updateURL();
    
  }, [dispatch, pageIndex, searchTerm]);

  return (
    <AppContainer>
      <AppContainerTitle>Search</AppContainerTitle>
      <AppContainerDescription>
        Find subscribers by name, email address or Id
      </AppContainerDescription>
      <SearchForm />
      <SubscriberList />
      <Pagination />
    </AppContainer>
  );
};

export default App;
