import React, { useState } from "react";
import "./newTicket.css";
import {
  Input,
  Form,
  TextArea,
  Button,
  Icon,
  Confirm,
} from "semantic-ui-react";
import { updateCacheAfterDelete } from "../../utils";
import {
  useAddTicketMutation,
  useDeleteColumnMutation,
} from "./types/operations";

interface NewTicketProps {
  colID: string;
  columnName: string;
  withDelete?: boolean;
}

const NewTicket: React.FC<NewTicketProps> = (props) => {
  const { colID, columnName, withDelete = false } = props;
  const [active, setActive] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteColumn] = useDeleteColumnMutation({
    update: updateCacheAfterDelete,
  });
  const [addTicket] = useAddTicketMutation({
    variables: {
      ticket: {
        title,
        description,
        onColumn: {
          colID,
        },
      },
    },
    ignoreResults: true,
    onCompleted: () => {
      setActive(false);
      setTitle("");
      setDescription("");
    },
  });
  return (
    <>
      {active && (
        <div className="New active">
          <Input
            placeholder="Enter Ticket Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Field
            control={TextArea}
            placeholder="Describe the Issue Here"
            value={description}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setDescription(e.target.value)}
          />
          {title !== "" && (
            <Button primary={true} onClick={() => addTicket()}>
              Submit
            </Button>
          )}
          <Button
            secondary={true}
            onClick={() => {
              setActive(false);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      {!active && (
        <div className="New inactive">
          {!active && (
            <div onClick={() => setActive(true)}>
              <Icon link name="plus" size="big" color="grey" />
            </div>
          )}
          {!showDelete && withDelete && (
            <div onClick={() => setShowDelete(true)}>
              <Icon
                link
                name="trash alternate outline"
                size="big"
                color="grey"
              />
            </div>
          )}
          <Confirm
            open={showDelete && withDelete}
            header="Delete Column?"
            content="Deleting this column will not delete the Tickets on this column."
            cancelButton="Nevermind"
            confirmButton={`Delete ${columnName} Column`}
            onCancel={() => setShowDelete(false)}
            onConfirm={() => deleteColumn({ variables: { colID: colID } })}
          />
        </div>
      )}
    </>
  );
};

export default NewTicket;
