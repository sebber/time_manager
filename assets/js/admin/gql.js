import { gql } from '@apollo/client';

export const EVENTS = gql`
  query Events($from: NaiveDateTime!, $to: NaiveDateTime!) {
    events(from: $from, to: $to) {
      id
      title
      start
      end
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $start: NaiveDateTime!, $end: NaiveDateTime!) {
    createEvent(title: $title, start: $start, end: $end) {
      id
      title
      start
      end
    }
  }
`;

