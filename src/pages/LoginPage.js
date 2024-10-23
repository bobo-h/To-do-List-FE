import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Modal } from "react-bootstrap";
import api from "./../utils/api";
import Button from "./../components/common/Button";

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setModalMessage("이메일을 입력해주세요.");
      setShowModal(true);
      return;
    }
    if (!password) {
      setModalMessage("패스워드를 입력해주세요.");
      setShowModal(true);
      return;
    }
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setModalMessage("로그인이 완료되었습니다.");
        setIsLoginSuccess(true);
        setShowModal(true);
        console.log(isLoginSuccess, showModal);
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      const errorMessage = error.error || "로그인에 실패했습니다.";
      setModalMessage(errorMessage);
      setIsLoginSuccess(false);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isLoginSuccess) {
      navigate("/");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="delete" onClick={handleModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
