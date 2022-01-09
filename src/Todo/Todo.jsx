import React, { useState } from "react";

import TodoItem, {
  MemoisedTodoItem,
  MemoisedTodoItemWithoutComparator,
} from "./TodoItem";

function Todo() {
  const [state, setState] = useState("");
  const [data, setData] = useState(() => {
    return new Array(5).fill(0).map((_, i) => ({
      id: i,
      title: `${i}th element`,
      status: false,
    }));
  });
  const handleAdd = (title) => {
    setData([
      ...data,
      {
        id: data.length - 1,
        title: title,
        status: false,
      },
    ]);
  };

  //   const handleToggle = (id) => {
  //     const updatedData = data.map((item) =>
  //       item.id === id ? { ...item, status: !item.status } : item
  //     );

  //     setData(updatedData, []);
  //   };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);

    setData(updatedData, []);
  };
  const handleToggle = React.useCallback(
    (id) => {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      );

      setData(updatedData, []);
    },
    [data]
  );
  // const handleToggle = React.useCallback((id) => {
  //   setData((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, status: !item.status } : item
  //     )
  //   );
  // }, []);
  console.log(data);
  return (
    <div>
      <div>
        <input
          placeholder="add something"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button onClick={() => handleAdd(state)}> ADD </button>
      </div>
      {data?.map((item) => (
        <MemoisedTodoItemWithoutComparator
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.status}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default Todo;
