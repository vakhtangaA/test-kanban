import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./ListItem";

const ListDiv = styled.div`
  background-color: #f8f8f9;
  max-width: 400px;
  margin: 1rem;
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  height: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 6px;
  background-color: #1c5a7c;
`;

const TaskList = styled.div`
  padding: 8px;
  border-radius: 6px;
  flex-grow: 1;
  min-height: 140px;
`;

function Column({ column, tasks }) {
  return (
    <ListDiv>
      <ListHeader>{column.title}</ListHeader>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ListDiv>
  );
}

export default Column;
