import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Item = styled.div`
  margin: 1rem 0.8rem;
  padding: 0.8rem 0.4rem;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 3px 3px 5px #d3d3d3;
  background-color: ${props => (props.isDragging ? "#C7D2FE" : "white")};
`;

function ListItem({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Item>
      )}
    </Draggable>
  );
}

export default ListItem;
