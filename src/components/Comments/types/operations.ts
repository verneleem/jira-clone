import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CommentDetailsFragment = (
  { __typename?: 'Comment' }
  & Pick<Types.Comment, 'id' | 'text' | 'datetime'>
  & { author: (
    { __typename?: 'User' }
    & UserNamesFragment
  ) }
);

export type UserNamesFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'username' | 'displayName' | 'image'>
);

export type DeleteCommentMutationVariables = Types.Exact<{
  commentID: Types.Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment?: Types.Maybe<(
    { __typename?: 'DeleteCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & Pick<Types.Comment, 'id'>
    )>>> }
  )> }
);

export type UpdateCommentMutationVariables = Types.Exact<{
  commentID: Types.Scalars['ID'];
  commentPatch: Types.CommentPatch;
}>;


export type UpdateCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateComment?: Types.Maybe<(
    { __typename?: 'UpdateCommentPayload' }
    & { comment?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Comment' }
      & CommentDetailsFragment
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
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentID: ID!) {
  deleteComment(filter: {id: [$commentID]}) {
    comment {
      id
    }
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentID: // value for 'commentID'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, baseOptions);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($commentID: ID!, $commentPatch: CommentPatch!) {
  updateComment(input: {filter: {id: [$commentID]}, set: $commentPatch}) {
    comment {
      ...commentDetails
    }
  }
}
    ${CommentDetailsFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentID: // value for 'commentID'
 *      commentPatch: // value for 'commentPatch'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, baseOptions);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;