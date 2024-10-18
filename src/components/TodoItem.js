import { useState } from "react";
import { Col, Row, Modal, Form } from "react-bootstrap";
import Button from "./common/Button";

const TodoItem = ({ item, updateTask, deleteTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState(item.task);
  const [isComplete, setIsComplete] = useState(item.isComplete);

  const handleClickUpdate = () => {
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    updateTask(item._id, { task: newTask, isComplete });
    setShowModal(false);
  };

  const toggleComplete = () => {
    const updatedCompleteStatus = !isComplete;
    setIsComplete(updatedCompleteStatus);
    updateTask(item._id, { task: newTask, isComplete: updatedCompleteStatus });
  };

  const handleClickDelete = () => {
    deleteTask(item._id);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className={`todo-item ${isComplete ? "item-complete" : ""}`}>
            <div className="todo-content">{item.task}</div>

            <div>
              <Button onClick={toggleComplete} variant="delete">
                {isComplete ? "되돌리기" : "완료"}
              </Button>
              {!isComplete && (
                <Button onClick={handleClickUpdate} variant="delete">
                  수정
                </Button>
              )}
              <Button onClick={handleClickDelete} variant="delete">
                삭제
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>수정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>할 일 수정</Form.Label>
              <Form.Control
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="delete">
            닫기
          </Button>
          <Button onClick={handleSaveChanges} variant="delete">
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoItem;
