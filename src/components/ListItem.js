import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0.8rem;
  padding: 0.8rem 0.4rem;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 3px 3px 5px #d3d3d3;
  background-color: ${props => (props.isDragging ? "#C7D2FE" : "white")};
`;

function ListItem({ task, index, deleteTask, columnId }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <div style={{ maxWidth: "70%", wordWrap: "break-word" }}>
            {task.content}
          </div>
          <div>
            <DeleteIcon
              style={{ fill: "red", cursor: "initial" }}
              onClick={() => deleteTask(task.id, columnId)}
            ></DeleteIcon>
          </div>
        </Item>
      )}
    </Draggable>
  );
}

export default ListItem;
