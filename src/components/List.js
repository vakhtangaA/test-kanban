import React from "react";
import ListItem from "./ListItem";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListDiv = styled.div`
  background-color: #f8f8f9;
  max-width: 400px;
  padding-bottom: 1rem;
`;

const ListHeader = styled.div`
  background-color: #1c5a7c;
  height: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 6px;
`;

function List({ list, id, listTitle }) {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <ListDiv ref={provided.innerRef} {...provided.droppableProps}>
          <ListHeader>{listTitle}</ListHeader>
          {list.map((item, index) => {
            return (
              <ListItem
                index={index}
                key={index}
                draggableId={index.toString()}
                text={item}
              />
            );
          })}

          {provided.placeholder}
        </ListDiv>
      )}
    </Droppable>
  );
}

export default List;
