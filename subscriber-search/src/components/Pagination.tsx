import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageIndex } from "../redux/subscribersSlice";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { Subscriber } from "../interfaces/types";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.25rem;
`;

const PaginationTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.9375rem;
`;

const PageButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const PageButtonLeft = styled.button`
  padding: 1rem;
  font-size: 1rem;
  background-color: #111111;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 0.3125rem;
  background-image: url("assets/img/arrow_left.svg");
  background-repeat: no-repeat;
  background-position: 0.625rem;
  border-radius: 0.5rem;
  height: 2.875rem;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.7);
    cursor: not-allowed;
  }
`;
const PageButtonRight = styled.button`
  padding: 1rem;
  font-size: 1rem;
  background-color: #111111;
  border-radius: 0.5rem;
  color: #fff;
  border: none;
  cursor: pointer;
  background-image: url("assets/img/arrow_right.svg");
  background-repeat: no-repeat;
  margin: 0 0.3125rem;
  background-position: 0.625rem;
  height: 2.875rem;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.7);
    cursor: not-allowed;
  }
`;

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { pageIndex, totalPages } = useSelector((state: RootState) => ({
    pageIndex: state.subscribers.pageIndex,
    totalPages: Math.ceil(
      state.subscribers.totalResults / state.subscribers.pageSize
    ),
  }));

  const handlePreviousPage = () => {
    dispatch(setPageIndex(pageIndex - 1));
  };

  const handleNextPage = () => {
    dispatch(setPageIndex(pageIndex + 1));
  };

  const subscribers: Subscriber[] = useSelector(
    (state: RootState) => state.subscribers.subscribers
  );

  return (
    <>
      {subscribers.length > 0 ?  
        <PaginationContainer>
          <PaginationTitle>
            Page {pageIndex + 1} of {totalPages}
          </PaginationTitle>
          <PageButtonsContainer>
            <PageButtonLeft
              onClick={handlePreviousPage}
              disabled={pageIndex === 0}
            ></PageButtonLeft>
            <PageButtonRight
              onClick={handleNextPage}
              disabled={pageIndex === totalPages - 1}
            ></PageButtonRight>
          </PageButtonsContainer>
        </PaginationContainer>
        :null
      }
    </>
  );
};

export default Pagination;
