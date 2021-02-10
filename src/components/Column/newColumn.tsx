import React, { useState } from "react";
import "./newColumn.css";
import { useParams } from "react-router-dom";
import { Input, Button, Icon } from "semantic-ui-react";
import { useAddColumnMutation } from "./types/operations";

interface URLParams {
  projID: string;
}

const NewColumn: React.FC = () => {
  const { projID } = useParams<URLParams>();
  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [addColumn] = useAddColumnMutation({
    variables: {
      column: {
        inProject: {
          projID,
        },
        name,
      },
    },
    ignoreResults: true,
    onCompleted: () => {
      setActive(false);
      setName("");
    },
  });
  return (
    <div
      className={`New${active ? " active" : ""}`}
      onClick={() => (!active ? setActive(true) : {})}
    >
      <div>
        {active && (
          <div>
            <Input
              placeholder="Enter Column Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name !== "" && (
              <Button primary={true} onClick={() => addColumn()}>
                Submit
              </Button>
            )}
            <Button
              secondary={true}
              onClick={() => {
                setActive(false);
                setName("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}
        {!active && <Icon name="plus" size="big" color="grey" />}
      </div>
    </div>
  );
};

export default NewColumn;
