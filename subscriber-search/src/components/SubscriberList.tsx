import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../redux/store';
import { Subscriber } from '../interfaces/types';

const GridContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 70%;
  margin: 0 auto;
`;

const GridItem = styled.li`
  flex: 0 0 30%;
  max-width: 30%;
  padding: 0.625rem;

  @media screen and (max-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const SubscriberCard = styled.div`
  border: 0.0625rem solid #ccc;
  padding: 0.625rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
`;

const SubscriberName = styled.div`
  font-size: 1.125rem;
  color: rgba(17, 17, 17, 1);
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 93%;
  text-align: justify;
`;

const SubscriberEmail = styled.div`
  font-size: 0.875rem;
  color: rgba(99, 99, 99, 1);
`;

const SubscriberId = styled.div`
  font-size: 0.875rem;
  color: rgba(163, 163, 163, 1);
`;

const NoSubscribers = styled.label`
  padding-top: 2.5rem;
  font-size: 1rem;
  color: rgba(99, 99, 99, 1);
  margin: 0 auto;
`;

const SubscriberContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubscriberIdImage = styled.div`
  font-size: 0.875rem;
  color: rgba(163, 163, 163, 1);
  background-image: url('assets/img/id.svg');
  background-repeat: no-repeat;
  width: 1rem;
  height: 1rem;
  margin-top: 0.125rem;
  margin-right: 0.3125rem;
`;

const SubscriberList: React.FC = () => {
  const subscribers: Subscriber[] = useSelector(
    (state: RootState) => state.subscribers.subscribers
  );

  return (
    <GridContainer>
      {subscribers.length ? (
        <>
          {subscribers.map((subscriber) => (
            <GridItem key={subscriber.SubscriberId}>
              <SubscriberCard>
                <SubscriberName>{subscriber.Name}</SubscriberName>
                <SubscriberEmail>{subscriber.Email}</SubscriberEmail>
                <SubscriberContainer>
                  <SubscriberIdImage />
                  <SubscriberId>{subscriber.SubscriberId}</SubscriberId>
                </SubscriberContainer>
              </SubscriberCard>
            </GridItem>
          ))}
        </>
      ) : (
        <NoSubscribers>No results. Try a different search.</NoSubscribers>
      )}
    </GridContainer>
  );
};

export default SubscriberList;
