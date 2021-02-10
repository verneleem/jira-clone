import * as Types from '../../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ColumnDetailsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
);

export type ColumnWithProjectColumnsFragment = (
  { __typename?: 'Column' }
  & Pick<Types.Column, 'colID' | 'name'>
  & { inProject: (
    { __typename?: 'Project' }
    & ProjectWithColumnsFragment
  ) }
);

export type ProjectWithColumnsFragment = (
  { __typename?: 'Project' }
  & Pick<Types.Project, 'projID'>
  & { columns?: Types.Maybe<Array<Types.Maybe<(
    { __typename?: 'Column' }
    & Pick<Types.Column, 'colID'>
  )>>> }
);

export type AddColumnMutationVariables = Types.Exact<{
  column: Types.AddColumnInput;
}>;


export type AddColumnMutation = (
  { __typename?: 'Mutation' }
  & { addColumn?: Types.Maybe<(
    { __typename?: 'AddColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnWithProjectColumnsFragment
    )>>> }
  )> }
);

export type UpdateColumnNameMutationVariables = Types.Exact<{
  colID: Types.Scalars['ID'];
  name: Types.Scalars['String'];
}>;


export type UpdateColumnNameMutation = (
  { __typename?: 'Mutation' }
  & { updateColumn?: Types.Maybe<(
    { __typename?: 'UpdateColumnPayload' }
    & { column?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Column' }
      & ColumnDetailsFragment
    )>>> }
  )> }
);

export const ColumnDetailsFragmentDoc = gql`
    fragment columnDetails on Column {
  colID
  name
}
    `;
export const ProjectWithColumnsFragmentDoc = gql`
    fragment projectWithColumns on Project {
  projID
  columns {
    colID
  }
}
    `;
export const ColumnWithProjectColumnsFragmentDoc = gql`
    fragment columnWithProjectColumns on Column {
  colID
  name
  inProject {
    ...projectWithColumns
  }
}
    ${ProjectWithColumnsFragmentDoc}`;
export const AddColumnDocument = gql`
    mutation addColumn($column: AddColumnInput!) {
  addColumn(input: [$column]) {
    column {
      ...columnWithProjectColumns
    }
  }
}
    ${ColumnWithProjectColumnsFragmentDoc}`;
export type AddColumnMutationFn = Apollo.MutationFunction<AddColumnMutation, AddColumnMutationVariables>;

/**
 * __useAddColumnMutation__
 *
 * To run a mutation, you first call `useAddColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addColumnMutation, { data, loading, error }] = useAddColumnMutation({
 *   variables: {
 *      column: // value for 'column'
 *   },
 * });
 */
export function useAddColumnMutation(baseOptions?: Apollo.MutationHookOptions<AddColumnMutation, AddColumnMutationVariables>) {
        return Apollo.useMutation<AddColumnMutation, AddColumnMutationVariables>(AddColumnDocument, baseOptions);
      }
export type AddColumnMutationHookResult = ReturnType<typeof useAddColumnMutation>;
export type AddColumnMutationResult = Apollo.MutationResult<AddColumnMutation>;
export type AddColumnMutationOptions = Apollo.BaseMutationOptions<AddColumnMutation, AddColumnMutationVariables>;
export const UpdateColumnNameDocument = gql`
    mutation updateColumnName($colID: ID!, $name: String!) {
  updateColumn(input: {filter: {colID: [$colID]}, set: {name: $name}}) {
    column {
      ...columnDetails
    }
  }
}
    ${ColumnDetailsFragmentDoc}`;
export type UpdateColumnNameMutationFn = Apollo.MutationFunction<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;

/**
 * __useUpdateColumnNameMutation__
 *
 * To run a mutation, you first call `useUpdateColumnNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnNameMutation, { data, loading, error }] = useUpdateColumnNameMutation({
 *   variables: {
 *      colID: // value for 'colID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateColumnNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>) {
        return Apollo.useMutation<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>(UpdateColumnNameDocument, baseOptions);
      }
export type UpdateColumnNameMutationHookResult = ReturnType<typeof useUpdateColumnNameMutation>;
export type UpdateColumnNameMutationResult = Apollo.MutationResult<UpdateColumnNameMutation>;
export type UpdateColumnNameMutationOptions = Apollo.BaseMutationOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;