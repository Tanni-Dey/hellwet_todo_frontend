import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [singleTask, setSingleTask] = useState({});
  const [toast, setToast] = useState(false);

  const notification = (
    <div className="toast toast-top toast-end">
      <div className="alert alert-error">
        <div>
          <span>Task Deleted</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    fetch("https://hellwet-todo-backend.onrender.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [singleTask, todos]);

  const handleDelete = (id) => {
    fetch(`https://hellwet-todo-backend.onrender.com/todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          res.json();
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
        }
      })
      .then((data) => console.log(data));
  };

  return (
    // <div className="overflow-x-auto w-full">
    // <div className=" w-full h-full p-10 bg-slate-300">
    <div>
      <div className="card bg-violet-500 p-3 mb-5">
        <h2 className="card-tittle text-2xl text-white font-bold">All Task</h2>
      </div>
      {/* <table className="table w-full">
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
      </table> */}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {todos.map((todo) => (
          <div key={todo._id} className="">
            <div className="card glass bg-slate-200 hover:bg-slate-300">
              <div className="card-body text-left p-0">
                <h2 className="card-title">
                  {todo.tittle.length < 20
                    ? todo.tittle
                    : `${todo.tittle.slice(0, 20)}...`}
                </h2>
                <p className="break-all">
                  Description :
                  {todo.des.length < 100
                    ? todo.des
                    : `${todo.des.slice(0, 100)}...`}
                </p>
                <p className="text-sm text-success font-semibold">
                  Due Date : {todo.date}
                </p>
                <div className="card-actions justify-between items-center mt-3">
                  <div className="flex items-center">
                    <Link to={`edittodo/${todo._id}`}>
                      <span className="text-2xl">
                        <CiEdit />
                      </span>
                    </Link>
                    <label
                      htmlFor="delete-modal"
                      className="text-error text-xl btn p-0 min-h-0 h-full ml-3 bg-transparent hover:bg-transparent border-0"
                      onClick={() => setSingleTask(todo)}
                    >
                      <RiDeleteBinLine />
                    </label>
                  </div>
                  <label
                    htmlFor="details-modal"
                    className="btn btn-primary btn-sm"
                    onClick={() => setSingleTask(todo)}
                  >
                    Details
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ----- Details modal start ----- */}
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div className="modal modal-middle card glass">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{singleTask.tittle}</h3>
          <p className="py-4">{singleTask.des}</p>
          <p className="py-4">Due Date : {singleTask.date}</p>
          <div className="modal-action">
            <label
              htmlFor="details-modal"
              className="btn hover:bg-violet-600 border-0 bg-violet-500"
            >
              Ok
            </label>
          </div>
        </div>
      </div>
      {/* ----- Details modal end ----- */}

      {/* ----- Delete modal start ----- */}
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal modal-middle card glass">
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
      {toast && notification}
    </div>
  );
};

export default TodoList;
