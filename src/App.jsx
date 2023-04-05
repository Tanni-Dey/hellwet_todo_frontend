import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import TodoAdd from "./pages/Dashboard/TodoAdd/TodoAdd";
import TodoList from "./pages/Dashboard/TodoList/TodoList";
import EditTodo from "./pages/Dashboard/EditTodo/EditTodo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "addtodo",
          element: (
            <ProtectedRoute>
              <TodoAdd />
            </ProtectedRoute>
          ),
        },
        {
          path: "edittodo/:id",
          element: (
            <ProtectedRoute>
              <EditTodo />
            </ProtectedRoute>
          ),
        },
        {
          index: true,
          element: (
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
