const initialData = {
  tasks: {},
  columns: {
    "pending-tasks": {
      id: "pending-tasks",
      title: "Pending Tasks",
      taskIds: [],
    },
    "ongoing-tasks": {
      id: "ongoing-tasks",
      title: "Ongoing Tasks",
      taskIds: [],
    },
    review: {
      id: "review",
      title: "Review",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["pending-tasks", "ongoing-tasks", "review", "completed"],
};

export default initialData;
