import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import initialData from "./initial-data";
import Column from "./components/Column";

const Container = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-around;
  align-items: flex-start;

  > div {
    width: 300px;
    margin-bottom: 1rem;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Header = styled.header`
  height: 50px;
  background: #155e75;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: white;
  height: 70px;
  background: #1f2937;
  ${"" /* position: absolute; */}
  bottom: 0;
  left: 0;
  right: 0;

  position: fixed;
`;

function App() {
  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  const handleTaskSave = (newTask, columnId) => {
    const currentLengthOfTasks = Object.keys(state.tasks).length;

    const newColumn = state.columns[columnId];
    newColumn.taskIds.push(`task-${currentLengthOfTasks + 1}`);

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [`task-${currentLengthOfTasks + 1}`]: {
          id: `task-${currentLengthOfTasks + 1}`,
          content: `${newTask}`,
        },
      },
      columns: {
        ...state.columns,
        [columnId]: newColumn,
      },
    });
  };

  const deleteTask = (taskId, columnId) => {
    const newTasks = { ...state.tasks };

    delete newTasks[taskId];

    let columnTasks = state.columns[columnId].taskIds;

    columnTasks = columnTasks.filter(item => item !== taskId);

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [columnId]: { ...state.columns[columnId], taskIds: columnTasks },
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header>
        <h2>Sweeft-kanban</h2>
      </Header>
      <Container>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              handleTaskSave={handleTaskSave}
              deleteTask={deleteTask}
            />
          );
        })}
      </Container>
      <Footer>2021</Footer>
    </DragDropContext>
  );
}

export default App;
