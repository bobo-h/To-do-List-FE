import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
// import { useEffect, useState } from "react";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// import TodoBoard from "./components/TodoBoard";

// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import api from "./utils/api";
// import Button from "./components/common/Button";

// function App() {
//   const [todoList, setTodoList] = useState([]);
//   const [todoValue, setTodoValue] = useState("");

//   const getTasks = async () => {
//     const response = await api.get("/tasks");
//     console.log("get response", response.data.data);
//     setTodoList(response.data.data);
//   };

//   const addTask = async () => {
//     try {
//       const response = await api.post("/tasks", {
//         task: todoValue,
//         isComplete: false,
//       });
//       if (response.status === 200) {
//         console.log("성공");
//         setTodoValue("");
//         getTasks();
//       } else {
//         throw new Error("task can not be added");
//       }
//     } catch (err) {
//       console.log("add error", err);
//     }
//   };

//   const updateTask = async (id, updatedTask) => {
//     try {
//       const response = await api.put(`/tasks/${id}`, updatedTask);
//       if (response.status === 200) {
//         console.log("수정 성공");
//         getTasks();
//       } else {
//         throw new Error("task can not be updated");
//       }
//     } catch (err) {
//       console.log("update error", err);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       const response = await api.delete(`/tasks/${id}`);
//       if (response.status === 200) {
//         console.log("삭제 성공");
//         getTasks();
//       } else {
//         throw new Error("task can not be deleted");
//       }
//     } catch (err) {
//       console.log("delete error", err);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <Container>
//       <Row className="add-item-row">
//         <Col xs={12} sm={10}>
//           <input
//             type="text"
//             placeholder="할일을 입력하세요"
//             className="input-box"
//             value={todoValue}
//             onChange={(event) => setTodoValue(event.target.value)}
//           />
//         </Col>
//         <Col xs={12} sm={2}>
//           <Button onClick={addTask} variant="default">
//             추가
//           </Button>
//         </Col>
//       </Row>

//       <TodoBoard
//         todoList={todoList}
//         updateTask={updateTask}
//         deleteTask={deleteTask}
//       />
//     </Container>
//   );
// }

// export default App;
