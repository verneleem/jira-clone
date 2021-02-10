import React, { useState } from "react";
import { Button, Comment } from "semantic-ui-react";
import { Comment as CommentT } from "../../types/graphql";
import CommentComp from "./comment";

interface CommentsProps {
  comments: CommentT[];
}

export const CommentsComp: React.FC<CommentsProps> = ({ comments }) => {
  const [limit, setLimit] = useState(true);
  const toggleLimit = () => setLimit(!limit);
  return (
    <Comment.Group>
      {comments?.map((comment, i) => {
        if (limit && i > 2) return null;
        return <CommentComp comment={comment} key={comment.id} />;
      })}
      {comments.length > 3 && (
        <Button onClick={() => toggleLimit()}>
          {limit ? "Show More" : "Show Less"}
        </Button>
      )}
    </Comment.Group>
  );
};

export default CommentsComp;
