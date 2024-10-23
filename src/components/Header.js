import { Link } from "react-router-dom";
import Button from "./common/Button";
import "./Header.css";

const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>To-Do-List</h1>
      </div>
      <div className="header-right">
        {user ? (
          <Button variant="delete" onClick={handleLogout}>
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
