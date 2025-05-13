import React from "react";
import "./ToDoItem.css";

const ToDoItem = ({data, remove, check}) => {
  const {title, description, category, day, done} = data;
  return (
  <article>
      <div className="check-box">
        <input type="checkbox" checked={done} onChange={check} />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Categoría: <b>{category}</b></p>
        <p>Día: <b>{day}</b></p>
        </div>
      </div>
      <button onClick={remove}>Borrar</button>
    </article>
  )
};

export default ToDoItem;
