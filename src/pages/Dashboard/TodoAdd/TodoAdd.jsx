import React, { useState } from "react";

const TodoAdd = () => {
  const [toast, setToast] = useState(false);

  const notification = (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <div>
          <span>Task Created</span>
        </div>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const tittle = e.target.tittle.value;
    const des = e.target.des.value;
    const date = e.target.date.value;
    const addTodo = {
      tittle: tittle,
      des: des,
      date: date,
    };

    fetch("https://hellwet-todo-backend.onrender.com/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addTodo),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json();
          setToastMsg("Task Created");
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
        }
      })
      .then((data) => console.log(data));
  };

  return (
    <div className="flex justify-center items-center bg-slate-300">
      <div className="card sm:w-96 w-60 glass bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="card-body p-0">
          <h2 className="card-title text-2xl text-white mb-5">Add a Task</h2>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="tittle"
              required
              placeholder="Enter Task Tittle"
              className="input input-bordered input-md w-full max-w-xs mb-3"
            />
            <textarea
              type="text"
              name="des"
              required
              placeholder="Enter Task Description"
              className="textarea textarea-bordered textarea-md w-full max-w-xs mb-3"
            />
            <input
              type="date"
              name="date"
              required
              placeholder="Enter Task Due Date"
              className="input input-bordered input-md w-full max-w-xs mb-3"
            />
            <input
              type="submit"
              value="Add Task"
              className="btn w-full hover:opacity-70 text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 border-0"
            />
          </form>
        </div>
      </div>
      {toast && notification}
    </div>
  );
};

export default TodoAdd;
