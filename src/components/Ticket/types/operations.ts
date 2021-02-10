import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ColumnDetailsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
);

export type ColumnWithTicketsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name' | 'order'>
  & { tickets?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Ticket' }
    & TicketDetailsWithCommentsFragment
  )>>> }
);

export type CommentDetailsFragment = (
  { __typename?: 'Comment' }
  & Pick<Types.Comment, 'id' | 'text' | 'datetime'>
  & { author: (
    { __typename?: 'User' }
    & UserNamesFragment
  ) }
);

export type TicketDetailsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Types.Ticket, 'id' | 'title' | 'description'>
  & { assigned?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )> }
);

export type TicketDetailsWithCommentsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Types.Ticket, 'id' | 'title' | 'description'>
  & { assigned?: Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>, comments?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Comment' }
    & CommentDetailsFragment
  )>>> }
);

export type TicketWithColumnFragment = (
  { __typename?: 'Ticket' }
  & { onColumn: (
    { __typename?: 'Column' }
    & ColumnDetailsFragment
  ) }
  & TicketDetailsFragment
);

export type TicketWithColumnWithTicketsFragment = (
  { __typename?: 'Ticket' }
  & { onColumn: (
    { __typename?: 'Column' }
    & ColumnWithTicketsFragment
  ) }
  & TicketDetailsFragment
);

export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type AllowedUsersQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type AllowedUsersQuery = (
  { __typename?: 'Query' }
  & { queryUser?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>>> }
);

export type AddCommentMutationVariables = Types.Exact<{
  comment: Types.AddCommentInput;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment?: Types.Maybe<(
    { __typename?: 'AddCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id'>
      & { onTicket?: Types.Maybe<(
        { __typename?: 'Ticket' }
        & Pick<Types.Ticket, 'id'>
        & { comments?: Types.Maybe<Array<Types.Maybe<(
          { __typename?: 'Comment' }
          & CommentDetailsFragment
        )>>> }
      )> }
    )>>> }
  )> }
);

export type AddTicketMutationVariables = Types.Exact<{
  ticket: Types.AddTicketInput;
}>;


export type AddTicketMutation = (
  { __typename?: 'Mutation' }
  & { addTicket?: Types.Maybe<(
    { __typename?: 'AddTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnWithTicketsFragment
    )>>> }
  )> }
);

export type DeleteColumnMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
}>;


export type DeleteColumnMutation = (
  { __typename?: 'Mutation' }
  & { deleteColumn?: Types.Maybe<(
    { __typename?: 'DeleteColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & Pick<Types.Column, 'colID'>
    )>>> }
  )> }
);

export type DeleteTicketMutationVariables = Types.Exact<{
  ticketID: Types.Scalars['ID'];
}>;


export type DeleteTicketMutation = (
  { __typename?: 'Mutation' }
  & { deleteTicket?: Types.Maybe<(
    { __typename?: 'DeleteTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & Pick<Types.Ticket, 'id'>
    )>>> }
  )> }
);

export type UpdateTicketMutationVariables = Types.Exact<{
  ticketID: Types.Scalars['ID'];
  ticket?: Types.Maybe<Types.TicketPatch>;
  remove?: Types.Maybe<Types.TicketPatch>;
}>;


export type UpdateTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket?: Types.Maybe<(
    { __typename?: 'UpdateTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )> }
);

export const UserNamesFragmentDoc = gql`
    fragment userNames on User {
  username
  displayName
  image
}
    `;
export const TicketDetailsFragmentDoc = gql`
    fragment ticketDetails on Ticket {
  id
  title
  description
  assigned {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const ColumnDetailsFragmentDoc = gql`
    fragment columnDetails on Column {
  colID
  name
}
    `;
export const TicketWithColumnFragmentDoc = gql`
    fragment ticketWithColumn on Ticket {
  ...ticketDetails
  onColumn {
    ...columnDetails
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnDetailsFragmentDoc}`;
export const CommentDetailsFragmentDoc = gql`
    fragment commentDetails on Comment {
  id
  text
  datetime
  author {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const TicketDetailsWithCommentsFragmentDoc = gql`
    fragment ticketDetailsWithComments on Ticket {
  id
  title
  description
  assigned {
    ...userNames
  }
  comments(order: {desc: datetime}) {
    ...commentDetails
  }
}
    ${UserNamesFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const ColumnWithTicketsFragmentDoc = gql`
    fragment columnWithTickets on Column {
  colID
  name
  tickets {
    ...ticketDetailsWithComments
  }
  order
}
    ${TicketDetailsWithCommentsFragmentDoc}`;
export const TicketWithColumnWithTicketsFragmentDoc = gql`
    fragment ticketWithColumnWithTickets on Ticket {
  ...ticketDetails
  onColumn {
    ...columnWithTickets
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnWithTicketsFragmentDoc}`;
export const AllowedUsersDocument = gql`
    query allowedUsers($username: String!) {
  queryUser(filter: {username: {eq: $username}}, order: {desc: displayName}) {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;

/**
 * __useAllowedUsersQuery__
 *
 * To run a query within a React component, call `useAllowedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllowedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllowedUsersQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAllowedUsersQuery(baseOptions: Apollo.QueryHookOptions<AllowedUsersQuery, AllowedUsersQueryVariables>) {
        return Apollo.useQuery<AllowedUsersQuery, AllowedUsersQueryVariables>(AllowedUsersDocument, baseOptions);
      }
export function useAllowedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllowedUsersQuery, AllowedUsersQueryVariables>) {
          return Apollo.useLazyQuery<AllowedUsersQuery, AllowedUsersQueryVariables>(AllowedUsersDocument, baseOptions);
        }
export type AllowedUsersQueryHookResult = ReturnType<typeof useAllowedUsersQuery>;
export type AllowedUsersLazyQueryHookResult = ReturnType<typeof useAllowedUsersLazyQuery>;
export type AllowedUsersQueryResult = Apollo.QueryResult<AllowedUsersQuery, AllowedUsersQueryVariables>;
export const AddCommentDocument = gql`
    mutation addComment($comment: AddCommentInput!) {
  addComment(input: [$comment]) {
    comment {
      id
      onTicket {
        id
        comments(order: {desc: datetime}) {
          ...commentDetails
        }
      }
    }
  }
}
    ${CommentDetailsFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddTicketDocument = gql`
    mutation addTicket($ticket: AddTicketInput!) {
  addTicket(input: [$ticket]) {
    ticket {
      ...ticketWithColumnWithTickets
    }
  }
}
    ${TicketWithColumnWithTicketsFragmentDoc}`;
export type AddTicketMutationFn = Apollo.MutationFunction<AddTicketMutation, AddTicketMutationVariables>;

/**
 * __useAddTicketMutation__
 *
 * To run a mutation, you first call `useAddTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketMutation, { data, loading, error }] = useAddTicketMutation({
 *   variables: {
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useAddTicketMutation(baseOptions?: Apollo.MutationHookOptions<AddTicketMutation, AddTicketMutationVariables>) {
        return Apollo.useMutation<AddTicketMutation, AddTicketMutationVariables>(AddTicketDocument, baseOptions);
      }
export type AddTicketMutationHookResult = ReturnType<typeof useAddTicketMutation>;
export type AddTicketMutationResult = Apollo.MutationResult<AddTicketMutation>;
export type AddTicketMutationOptions = Apollo.BaseMutationOptions<AddTicketMutation, AddTicketMutationVariables>;
export const DeleteColumnDocument = gql`
    mutation deleteColumn($colID: ID!) {
  deleteColumn(filter: {colID: [$colID]}) {
    column {
      colID
    }
  }
}
    `;
export type DeleteColumnMutationFn = Apollo.MutationFunction<DeleteColumnMutation, DeleteColumnMutationVariables>;

/**
 * __useDeleteColumnMutation__
 *
 * To run a mutation, you first call `useDeleteColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteColumnMutation, { data, loading, error }] = useDeleteColumnMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *   },
 * });
 */
export function useDeleteColumnMutation(baseOptions?: Apollo.MutationHookOptions<DeleteColumnMutation, DeleteColumnMutationVariables>) {
        return Apollo.useMutation<DeleteColumnMutation, DeleteColumnMutationVariables>(DeleteColumnDocument, baseOptions);
      }
export type DeleteColumnMutationHookResult = ReturnType<typeof useDeleteColumnMutation>;
export type DeleteColumnMutationResult = Apollo.MutationResult<DeleteColumnMutation>;
export type DeleteColumnMutationOptions = Apollo.BaseMutationOptions<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const DeleteTicketDocument = gql`
    mutation deleteTicket($ticketID: ID!) {
  deleteTicket(filter: {id: [$ticketID]}) {
    ticket {
      id
    }
  }
}
    `;
export type DeleteTicketMutationFn = Apollo.MutationFunction<DeleteTicketMutation, DeleteTicketMutationVariables>;

/**
 * __useDeleteTicketMutation__
 *
 * To run a mutation, you first call `useDeleteTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketMutation, { data, loading, error }] = useDeleteTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *   },
 * });
 */
export function useDeleteTicketMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketMutation, DeleteTicketMutationVariables>) {
        return Apollo.useMutation<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, baseOptions);
      }
export type DeleteTicketMutationHookResult = ReturnType<typeof useDeleteTicketMutation>;
export type DeleteTicketMutationResult = Apollo.MutationResult<DeleteTicketMutation>;
export type DeleteTicketMutationOptions = Apollo.BaseMutationOptions<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const UpdateTicketDocument = gql`
    mutation updateTicket($ticketID: ID!, $ticket: TicketPatch, $remove: TicketPatch) {
  updateTicket(input: {filter: {id: [$ticketID]}, set: $ticket, remove: $remove}) {
    ticket {
      ...ticketWithColumn
    }
  }
}
    ${TicketWithColumnFragmentDoc}`;
export type UpdateTicketMutationFn = Apollo.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      ticketID: // value for 'ticketID'
 *      ticket: // value for 'ticket'
 *      remove: // value for 'remove'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        return Apollo.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, baseOptions);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = Apollo.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = Apollo.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;