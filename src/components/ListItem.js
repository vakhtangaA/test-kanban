import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled.div`
  color: ${props => (props.colorMode === "light" ? "#2B3744" : "white")};

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0.8rem;
  padding: 0.8rem 0.4rem;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: ${props =>
    props.colorMode === "light" ? "3px 3px 5px #d3d3d3" : "3px 3px 5px black"};
  background-color: ${props =>
    props.isDragging
      ? "#C7D2FE"
      : props.colorMode === "light"
      ? "white"
      : "#363636"};
`;

function ListItem({ task, index, deleteTask, columnId, colorMode }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          colorMode={colorMode}
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
