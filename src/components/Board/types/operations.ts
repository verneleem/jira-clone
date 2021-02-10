import * as Types from '../../../types/graphql';

import { TicketDetailsFragment, ColumnDetailsFragment } from '../../Ticket/types/operations';
import { gql } from '@apollo/client';
import { TicketDetailsFragmentDoc, ColumnDetailsFragmentDoc } from '../../Ticket/types/operations';
import * as Apollo from '@apollo/client';
export type ColumnOrderFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'order'>
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

export type ProjectAllDetailsFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'name' | 'url' | 'description' | 'order'>
);

export type ProjectOrderFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID' | 'order'>
);

export type RoleDetailsFragment = (
  { __typename?: 'Role' }
  & Pick<Types.Role, 'id' | 'permission'>
  & { assignedTo?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'User' }
    & UserNamesFragment
  )>>> }
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

export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type GetProjectQueryVariables = Types.Exact<{
  projectID: Types.Scalars['ID'];
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Types.Maybe<(
    { __typename?: 'Project' }
    & { admin?: Types.Maybe<(
      { __typename?: 'User' }
      & UserNamesFragment
    )>, roles?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Role' }
      & RoleDetailsFragment
    )>>>, columns?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnWithTicketsFragment
    )>>> }
    & ProjectAllDetailsFragment
  )> }
);

export type MoveTicketMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  colID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type MoveTicketMutation = (
  { __typename?: 'Mutation' }
  & { updateTicket?: Types.Maybe<(
    { __typename?: 'UpdateTicketPayload' }
    & { ticket?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Ticket' }
      & TicketWithColumnFragment
    )>>> }
  )>, updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnOrderFragment
    )>>> }
  )> }
);

export type SetColumnOrderMutationVariables = Types.Exact<{
  projID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type SetColumnOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Types.Maybe<(
    { __typename?: 'UpdateProjectPayload' }
    & { project?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Project' }
      & ProjectOrderFragment
    )>>> }
  )> }
);

export type SetTicketOrderMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
  order: Types.Scalars['String'];
}>;


export type SetTicketOrderMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnOrderFragment
    )>>> }
  )> }
);

export const ColumnOrderFragmentDoc = gql`
    fragment columnOrder on Column {
  colID
  order
}
    `;
export const UserNamesFragmentDoc = gql`
    fragment userNames on User {
  username
  displayName
  image
}
    `;
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
export const ProjectAllDetailsFragmentDoc = gql`
    fragment projectAllDetails on Project {
  projID
  name
  url
  description
  order
}
    `;
export const ProjectOrderFragmentDoc = gql`
    fragment projectOrder on Project {
  projID
  order
}
    `;
export const RoleDetailsFragmentDoc = gql`
    fragment roleDetails on Role {
  id
  permission
  assignedTo {
    ...userNames
  }
}
    ${UserNamesFragmentDoc}`;
export const TicketWithColumnFragmentDoc = gql`
    fragment ticketWithColumn on Ticket {
  ...ticketDetails
  onColumn {
    ...columnDetails
  }
}
    ${TicketDetailsFragmentDoc}
${ColumnDetailsFragmentDoc}`;
export const GetProjectDocument = gql`
    query getProject($projectID: ID!) {
  getProject(projID: $projectID) {
    ...projectAllDetails
    admin {
      ...userNames
    }
    roles {
      ...roleDetails
    }
    columns {
      ...columnWithTickets
    }
  }
}
    ${ProjectAllDetailsFragmentDoc}
${UserNamesFragmentDoc}
${RoleDetailsFragmentDoc}
${ColumnWithTicketsFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, baseOptions);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const MoveTicketDocument = gql`
    mutation moveTicket($id: ID!, $colID: ID!, $order: String!) {
  updateTicket(input: {filter: {id: [$id]}, set: {onColumn: {colID: $colID}}}) {
    ticket {
      ...ticketWithColumn
    }
  }
  updateColumn(input: {filter: {colID: [$colID]}, set: {order: $order}}) {
    column {
      ...columnOrder
    }
  }
}
    ${TicketWithColumnFragmentDoc}
${ColumnOrderFragmentDoc}`;
export type MoveTicketMutationFn = Apollo.MutationFunction<MoveTicketMutation, MoveTicketMutationVariables>;

/**
 * __useMoveTicketMutation__
 *
 * To run a mutation, you first call `useMoveTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTicketMutation, { data, loading, error }] = useMoveTicketMutation({
 *   variables: {
 *      id: // value for 'id'
 *      colID: // value for 'colID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useMoveTicketMutation(baseOptions?: Apollo.MutationHookOptions<MoveTicketMutation, MoveTicketMutationVariables>) {
        return Apollo.useMutation<MoveTicketMutation, MoveTicketMutationVariables>(MoveTicketDocument, baseOptions);
      }
export type MoveTicketMutationHookResult = ReturnType<typeof useMoveTicketMutation>;
export type MoveTicketMutationResult = Apollo.MutationResult<MoveTicketMutation>;
export type MoveTicketMutationOptions = Apollo.BaseMutationOptions<MoveTicketMutation, MoveTicketMutationVariables>;
export const SetColumnOrderDocument = gql`
    mutation setColumnOrder($projID: ID!, $order: String!) {
  updateProject(input: {filter: {projID: [$projID]}, set: {order: $order}}) {
    project {
      ...projectOrder
    }
  }
}
    ${ProjectOrderFragmentDoc}`;
export type SetColumnOrderMutationFn = Apollo.MutationFunction<SetColumnOrderMutation, SetColumnOrderMutationVariables>;

/**
 * __useSetColumnOrderMutation__
 *
 * To run a mutation, you first call `useSetColumnOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetColumnOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setColumnOrderMutation, { data, loading, error }] = useSetColumnOrderMutation({
 *   variables: {
 *      projID: // value for 'projID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSetColumnOrderMutation(baseOptions?: Apollo.MutationHookOptions<SetColumnOrderMutation, SetColumnOrderMutationVariables>) {
        return Apollo.useMutation<SetColumnOrderMutation, SetColumnOrderMutationVariables>(SetColumnOrderDocument, baseOptions);
      }
export type SetColumnOrderMutationHookResult = ReturnType<typeof useSetColumnOrderMutation>;
export type SetColumnOrderMutationResult = Apollo.MutationResult<SetColumnOrderMutation>;
export type SetColumnOrderMutationOptions = Apollo.BaseMutationOptions<SetColumnOrderMutation, SetColumnOrderMutationVariables>;
export const SetTicketOrderDocument = gql`
    mutation setTicketOrder($colID: ID!, $order: String!) {
  updateColumn(input: {filter: {colID: [$colID]}, set: {order: $order}}) {
    column {
      ...columnOrder
    }
  }
}
    ${ColumnOrderFragmentDoc}`;
export type SetTicketOrderMutationFn = Apollo.MutationFunction<SetTicketOrderMutation, SetTicketOrderMutationVariables>;

/**
 * __useSetTicketOrderMutation__
 *
 * To run a mutation, you first call `useSetTicketOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTicketOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTicketOrderMutation, { data, loading, error }] = useSetTicketOrderMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSetTicketOrderMutation(baseOptions?: Apollo.MutationHookOptions<SetTicketOrderMutation, SetTicketOrderMutationVariables>) {
        return Apollo.useMutation<SetTicketOrderMutation, SetTicketOrderMutationVariables>(SetTicketOrderDocument, baseOptions);
      }
export type SetTicketOrderMutationHookResult = ReturnType<typeof useSetTicketOrderMutation>;
export type SetTicketOrderMutationResult = Apollo.MutationResult<SetTicketOrderMutation>;
export type SetTicketOrderMutationOptions = Apollo.BaseMutationOptions<SetTicketOrderMutation, SetTicketOrderMutationVariables>;