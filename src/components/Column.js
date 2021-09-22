import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./ListItem";
import { Modal } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const ListDiv = styled.div`
  background-color: #f8f8f9;
  max-width: 400px;
  margin: 1rem;
  margin-top: 10rem;

  flex: 1 1 0;

  @media (min-width: 800px) {
    max-width: 20%;
  }

  @media (max-width: 800px) {
    margin-top: 5rem;
  }

  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  height: 36px;
  color: white;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 6px;
  background-color: ${props =>
    props.id === "pending-tasks"
      ? "#1c5a7c"
      : props.id === "ongoing-tasks"
      ? "#106354"
      : props.id === "review"
      ? "#71441B"
      : props.id === "completed"
      ? "#54117D"
      : "grey"};
`;

const TaskList = styled.div`
  padding: 8px;
  border-radius: 6px;
  flex-grow: 1;
  min-height: 100px;
`;

const ButtonInput = styled.button`
  all: unset;
  height: 30px;
  border: none;
  box-shadow: 0 0 3px grey inset;
  margin: 10px;
  margin-top: 3px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 700;
  color: #334155;
`;

const DivModal = styled.div`
  position: absolute;
  width: 210px;
  height: 80px;
  left: calc(50% - 105px);
  top: calc(50% - 40px);
  background: grey;
  & h3: {
    color: red;
  }
`;

const MdlInput = styled.input`
  height: 40px;
  width: 100%;
  background: white;
  font-family: "Courier New", Courier, monospace;
  padding: 3px;
  color: #3f3f46;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

const MdlButton = styled.button`
  height: 30px;
  width: 50%;
  border: 2px solid #1c5a7c;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1c5a7c;
`;

function ModalInput({ handleTaskSave, columnId }) {
  const [open, setShow] = useState(false);
  const [task, setTask] = useState("");

  const handleClose = e => {
    setShow(false);

    if (e.target.name === "save") {
      handleTaskSave(task, columnId);
    }
    setTask("");
  };

  const handleShow = () => setShow(true);

  const handleInput = e => {
    setTask(e.target.value);
  };

  return (
    <>
      <ButtonInput onClick={handleShow}>+</ButtonInput>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DivModal>
          <MdlInput
            placeholder="task here"
            value={task}
            onChange={handleInput}
            ref={input => input && input.focus()}
          ></MdlInput>
          <MdlButton onClick={handleClose}>close</MdlButton>
          <MdlButton onClick={handleClose} name="save">
            save task
          </MdlButton>
        </DivModal>
      </Modal>
    </>
  );
}

function Column({ column, tasks, handleTaskSave, deleteTask }) {
  const [isEditMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChange = e => {
    if (e.target.value.length < 28) {
      setColumnTitle(e.target.value);
    } else {
      alert("It is too long");
    }
  };

  return (
    <ListDiv>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <>
            {isEditMode ? (
              <ListHeader id={column.id}>
                <input
                  value={columnTitle}
                  onChange={handleChange}
                  ref={input => input && input.focus()}
                  style={{
                    all: "unset",
                    background: "inherit",
                    maxWidth: "80%",
                  }}
                />
                <EditIcon onClick={handleEdit} />
                <SaveIcon onClick={handleSave} style={{ marginLeft: "1rem" }} />
              </ListHeader>
            ) : (
              <ListHeader id={column.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    wordWrap: "break-word",
                  }}
                >
                  <h4 style={{ marginRight: "1rem", wordWrap: "break-word" }}>
                    {columnTitle}
                  </h4>
                  <EditIcon onClick={handleEdit} />
                </div>
              </ListHeader>
            )}
            <TaskList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task, index) => (
                <div style={{ maxWidth: "100%" }} key={task.id}>
                  <Task
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    columnId={column.id}
                  ></Task>
                </div>
              ))}
              {provided.placeholder}
            </TaskList>
            <ModalInput
              columnId={column.id}
              handleTaskSave={handleTaskSave}
            ></ModalInput>
          </>
        )}
      </Droppable>
    </ListDiv>
  );
}

export default Column;
