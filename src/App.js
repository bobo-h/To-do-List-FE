import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import PrivateRoute from "./route/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const router = createBrowserRouter([
    {
      element: <MainLayout user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: (
            <PrivateRoute user={user}>
              <TodoPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <LoginPage user={user} setUser={setUser} />,
        },
        { path: "/register", element: <RegisterPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const MainLayout = ({ user, setUser }) => (
  <>
    <Header user={user} setUser={setUser} />
    <Outlet />
  </>
);

export default App;
