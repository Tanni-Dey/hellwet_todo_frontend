import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [singleTask, setSingleTask] = useState({});
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    fetch("https://hellwet-todo-backend.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [singleTask]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Action</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{todo.tittle}</div>
                  </div>
                </div>
              </td>
              <td>{todo.des}</td>
              <td>{todo.date}</td>
              <td>
                <Link to={`edittodo/${todo._id}`}>
                  <span className="text-xl">
                    <CiEdit />
                  </span>
                </Link>
              </td>
              <td>
                <label
                  htmlFor="delete-modal"
                  className="text-error btn btn-outline"
                  onClick={() => setSingleTask(todo)}
                >
                  <RiDeleteBinLine />
                </label>
              </td>
              <th>
                <label
                  htmlFor="details-modal"
                  className="btn btn-ghost btn-xs"
                  onClick={() => setSingleTask(todo)}
                >
                  details
                </label>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Action</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      {/* ----- Details modal start ----- */}
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{singleTask.tittle}</h3>
          <p className="py-4">{singleTask.des}</p>
          <p className="py-4">Due Date : {singleTask.date}</p>
          <div className="modal-action">
            <label htmlFor="details-modal" className="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
      {/* ----- Details modal end ----- */}

      {/* ----- Delete modal start ----- */}
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Delete This Todo ?</h3>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn btn-error">
              No
            </label>
            <label
              htmlFor="delete-modal"
              className="btn btn-success"
              onClick={() => handleDelete(singleTask._id)}
            >
              Yes
            </label>
          </div>
        </div>
      </div>
      {/* ----- Delete modal end ----- */}
    </div>
  );
};

export default TodoList;
