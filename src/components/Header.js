import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../states/AuthContext";
import Button from "./common/Button";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>To-Do-List</h1>
      </div>
      <div className="header-right">
        {isAuthenticated ? (
          <Button variant="delete" onClick={logout}>
            로그아웃
          </Button>
        ) : (
          <>
            <Link to="/register">
              <Button variant="delete">회원가입</Button>
            </Link>
            <Link to="/login">
              <Button variant="delete">로그인</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
