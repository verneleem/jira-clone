import { User } from "../../types/graphql";
import { Image } from "semantic-ui-react";
import React from "react";
import "./user.css";

export const UserWithIcon: React.FC<User> = (user) => {
  return (
    <div className="User icon">
      <Image
        src={
          user.image ||
          `https://identicon-api.herokuapp.com/${user.displayName?.replace(
            /[^A-Za-z0-9!?]/,
            ""
          )}/120?format=png`
        }
        avatar
      />
      <span>{user.displayName ?? user.username}</span>
    </div>
  );
};
