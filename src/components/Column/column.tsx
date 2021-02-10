import React, { useEffect, useState } from "react";
import "./column.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Input } from "semantic-ui-react";
import { Column as ColumnT, Ticket as TicketT } from "../../types/graphql";
import { NewTicket, Ticket } from "../Ticket";
import { useUpdateColumnNameMutation } from "./types/operations";

interface ColumnProps {
  column: ColumnT;
  index: number;
}

const Column: React.FC<ColumnProps> = (props) => {
  const { column, index } = props;
  const [editing, editColumn] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(column.name);
  }, [column]);
  const [saveColumnName] = useUpdateColumnNameMutation({
    onCompleted: () => editColumn(false),
  });
  return (
    <Draggable draggableId={column.colID} index={index}>
      {(provided) => (
        <div
          className="Column"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="Title" {...provided.dragHandleProps}>
            {!editing && (
              <>
                <h3>{column?.name}</h3>
                <Button
                  onClick={() => editColumn(true)}
                  size="mini"
                  basic
                  color="orange"
                  icon="edit outline"
                />
              </>
            )}
            {editing && (
              <>
                <Input
                  name="name"
                  placeholder="Column Name"
                  value={name}
                  onChange={(e, { value }) => setName(value)}
                  fluid
                />
                <div className="flex">
                  <Button
                    onClick={() => editColumn(false)}
                    size="mini"
                    color="grey"
                    basic
                    icon="cancel"
                  />
                  <Button
                    onClick={() =>
                      saveColumnName({
                        variables: { colID: column.colID, name },
                      })
                    }
                    size="mini"
                    color="green"
                    icon="save outline"
                  />
                </div>
              </>
            )}
          </div>
          <Droppable droppableId={column.colID} type="tickets">
            {(provided) => (
              <div
                className="Tickets"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.tickets?.map((ticket, index) => (
                  <Ticket
                    ticket={ticket as TicketT}
                    index={index}
                    key={ticket?.id}
                  />
                ))}
                {provided.placeholder}
                <NewTicket
                  colID={column?.colID}
                  columnName={column?.name}
                  withDelete
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
