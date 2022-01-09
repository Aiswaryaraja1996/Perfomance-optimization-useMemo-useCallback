import React, { useMemo } from "react";

const delay = (time) => {
  const start = Date.now();
  while (Date.now() - start < time) {
    continue;
  }
  return start;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.status === nextProps.status) {
    return true;
  }
  return false;
};

const TodoItem = ({ title, id, status, onDelete, onToggle }) => {
  /** Expensive calculation */
  const time = useMemo(() => delay(200), []);

  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
      <div>{title}</div>
      <button onClick={() => onToggle(id)}> {`${status}`}</button>
      <div>{time}</div>
      <button onClick={() => onDelete(id)}>DELETE</button>
    </div>
  );
};

export const MemoisedTodoItemWithoutComparator = React.memo(TodoItem);
export const MemoisedTodoItem = React.memo(TodoItem, areEqual);

export default TodoItem;
