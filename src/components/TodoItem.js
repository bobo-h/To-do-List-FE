import { useState } from "react";
import { Col, Row, Modal, Form } from "react-bootstrap";
import Button from "./common/Button";

const TodoItem = ({ item, toggleComplete, editTask, deleteTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(item.task);

  const handleClickUpdate = () => {
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    editTask(item._id, updatedTask);
    setShowModal(false);
  };

  const handleToggleComplete = () => {
    toggleComplete(item._id);
  };

  const handleClickDelete = () => {
    deleteTask(item._id);
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <div
            className={`todo-item ${item.isComplete ? "item-complete" : ""}`}
          >
            <div className="todo-content">{item.task}</div>
            <div>by {item.author ? item.author.name : "Unknown"}</div>
            <div>
              <Button onClick={handleToggleComplete} variant="delete">
                {item.isComplete ? "되돌리기" : "완료"}
              </Button>
              {!item.isComplete && (
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
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
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
