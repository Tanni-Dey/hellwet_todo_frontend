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

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addTodo),
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
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="tittle"
          required
          placeholder="Enter Task Tittle"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input
          type="text"
          name="des"
          required
          placeholder="Enter Task Description"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input
          type="date"
          name="date"
          required
          placeholder="Enter Task Due Date"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input type="submit" className="btn" />
      </form>
      {toast && notification}
    </>
  );
};

export default TodoAdd;
