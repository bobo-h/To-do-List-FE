import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "./../components/common/Button";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("taskList", response.data.data);
    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!todoValue.trim()) {
      alert("Please enter a task before adding.");
      return;
    }
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("추가 성공");
        getTasks();
        setTodoValue("");
      } else {
        throw new Error("task can not be added");
      }
    } catch (error) {
      console.log("add error:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        task: updatedTask,
      });
      if (response.status === 200) {
        console.log("수정 성공");
        getTasks();
      } else {
        throw new Error("task can not be updated");
      }
    } catch (err) {
      console.log("update error", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        console.log("삭제 성공");
        getTasks();
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <Button onClick={addTask} variant="default">
            추가
          </Button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        toggleComplete={toggleComplete}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </Container>
  );
};

export default TodoPage;
