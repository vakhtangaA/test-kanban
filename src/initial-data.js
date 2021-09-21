const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "write card" },
    "task-2": { id: "task-2", content: "Learn js" },
    "task-3": { id: "task-3", content: "Read book" },
    "task-4": { id: "task-4", content: "Write blog" },
    "task-5": { id: "task-5", content: "Make trello clone" },
  },
  columns: {
    "pending-tasks": {
      id: "pending-tasks",
      title: "Pending Tasks",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
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
