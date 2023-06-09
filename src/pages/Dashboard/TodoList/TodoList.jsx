import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [signOut] = useSignOut(auth);
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
    const allTodo = async () => {
      try {
        const { data } = await axios.get(
          "https://hellwet-todo-backend.onrender.com/todos",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setTodos(data);
      } catch (error) {
        setTodos([]);
      }
    };
    allTodo();
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
    <div>
      <div className="card bg-violet-500 p-3 mb-5">
        <h2 className="card-tittle text-2xl text-white font-bold">All Task</h2>
      </div>

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
