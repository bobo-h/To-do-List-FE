import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, toggleComplete, editTask, deleteTask }) => {
  return (
    <div>
      <h3>목록</h3>
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
