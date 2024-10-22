import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import Button from "./../components/common/Button";
import api from "./../utils/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "이름을 입력해주세요";
    if (!email) newErrors.email = "이메일을 입력해주세요";
    if (!password) newErrors.password = "패스워드를 입력해주세요";
    if (!confirmPassword)
      newErrors.confirmPassword = "패스워드를 다시 한 번 입력해주세요";

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "패스워드가 일치하지 않습니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post("/user", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      if (response.status === 200) {
        setModalMessage("회원가입에 성공하셨습니다");
        setIsSuccess(true);
        setShowModal(true);
      }
    } catch (error) {
      const errorMessage = error.error || "회원가입을 다시 시도해주세요";
      setModalMessage(errorMessage);
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      navigate("/login");
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error-text">{errors.confirmPassword}</div>
          )}
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;
