import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import {
  useAddUserMutation,
  useGetUserLazyQuery,
  useUpdateUserMutation,
} from "./types/operations";

const ManageUsers: React.FC = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [getUser, { called, loading, data, error }] = useGetUserLazyQuery();
  useEffect(() => {
    // check if user is authorized
    if (isAuthenticated && user.email) {
      const displayName = user?.name
        ? user.name
        : user?.email?.match?.(/^([^@]*)@/)[1];
      // check if query has been called yet
      if (!called) getUser({ variables: { username: user.email } });
      // there was an error, try again in 10 seconds
      if (error && !loading) {
        const timer = setTimeout(
          () => getUser({ variables: { username: user.email } }),
          10000
        );
        return () => clearTimeout(timer);
      }
      // if query called and finished loading
      if (called && !loading && !error) {
        // if no user found
        if (!data?.getUser?.username)
          addUser({
            variables: {
              username: user.email,
              displayName,
              image: user?.picture,
            },
          });
        // if found user
        if (data?.getUser?.username) {
          // if last query call was for different user call again
          if (data.getUser.username !== user.email) {
            getUser({ variables: { username: user.email } });
          } else {
            if (
              data.getUser.displayName !== displayName ||
              data.getUser.image !== user.picture
            ) {
              updateUser({
                variables: {
                  username: user.email,
                  displayName,
                  image: user.picture,
                },
              });
            }
          }
        }
      }
    }
  }, [
    user,
    getUser,
    addUser,
    updateUser,
    isAuthenticated,
    called,
    loading,
    data,
    error,
  ]);
  return <>{children}</>;
};

export default ManageUsers;
