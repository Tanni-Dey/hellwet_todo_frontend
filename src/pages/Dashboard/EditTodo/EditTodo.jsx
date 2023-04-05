import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditTodo = () => {
  const { id } = useParams();
  const [singleTodo, setSignleTodo] = useState({});
  const [toast, setToast] = useState(false);

  const notification = (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <div>
          <span>Task Edited</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    fetch(`http://localhost:5000/todo/${id}`)
      .then((res) => res.json())
      .then((data) => setSignleTodo(data));
  }, [singleTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tittle = e.target.tittle.value;
    const des = e.target.des.value;
    const date = e.target.date.value;
    const updatedTodo = {
      tittle: tittle,
      des: des,
      date: date,
    };

    fetch(`http://localhost:5000/todo/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
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
          placeholder="Enter Task Tittle"
          defaultValue={singleTodo.tittle}
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input
          type="text"
          name="des"
          placeholder="Enter Task Description"
          defaultValue={singleTodo.des}
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input
          type="date"
          name="date"
          placeholder="Enter Task Due Date"
          defaultValue={singleTodo.date}
          className="input input-bordered input-md w-full max-w-xs"
        />
        <input type="submit" className="btn" />
      </form>
      {toast && notification}
    </>
  );
};

export default EditTodo;
