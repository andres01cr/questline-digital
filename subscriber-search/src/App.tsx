import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState, AppDispatch } from "./redux/store";
import SearchForm from "./components/SearchForm";
import SubscriberList from "./components/SubscriberList";
import Pagination from "./components/Pagination";
import { searchSubscribers, setPageIndex, setSearchTerm } from "./redux/subscribersSlice";
import { useHistory, useLocation } from "react-router-dom";

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
  const { pageIndex: reduxPageIndex, searchTerm: reduxSearchTerm } = useSelector(
    (state: RootState) => state.subscribers
  );
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const pageIndex = Number(urlSearchParams.get("pageIndex")) || 0;
    const searchTerm = urlSearchParams.get("search") || "";

    dispatch(setPageIndex(pageIndex));
    dispatch(setSearchTerm(searchTerm));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (reduxSearchTerm.length >= 3 || reduxSearchTerm === "") {
      dispatch(searchSubscribers({ pageIndex: reduxPageIndex, searchTerm: reduxSearchTerm }));
    }
  }, [dispatch, reduxPageIndex, reduxSearchTerm]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("pageIndex", String(reduxPageIndex));
    urlSearchParams.set("search", reduxSearchTerm);
    const newURL = `?${urlSearchParams}`;

    if (location.search !== newURL) {
      history.replace(newURL);
    }
  }, [history, location.search, reduxPageIndex, reduxSearchTerm]);

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
