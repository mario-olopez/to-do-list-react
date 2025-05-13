import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import data from "./data.js"
import "./ToDoList.css"
//import { v4 as uuidv4 } from "uuid"


const ToDoList = () => {

  const [items, setItems] = useState(data)

  const [values, setValues] = useState({
      title: "",
      description: "",
      category: "",
      day: ""
  });

  /*const [inputError, setInputError] = useState({
    title: "",
    description: ""
  })*/
  
  //Crear una nueva tarea
  const addItem = (new_item) => {
    const updatedItems = [...items, new_item];
    setItems(updatedItems);
  }

  //Eliminar todas o una tarea
  const removeAllItems = () => setItems([])

  const removeItem = (i) => { 
    const remainingItems = items.filter((item, index) => index !== i)
    setItems(remainingItems)
  }

  //Restaurar las tareas guardadas en data
  const resetItems = () => setItems(data)

  //Marcar una tarea como hecha
  const checkDone = (index) => {
    const updatedItems = [...items];
    updatedItems[index].done = !updatedItems[index].done;
    setItems(updatedItems)
  } 

  //Vaciar el input tras 20 segundos
  useEffect(() => {

    if (!values.title && !values.description && !values.category && !values.day) return;

    const warning = setTimeout(() => {
      alert("El formulario se reiniciará por inactividad")
    }, 18000)

    const timeOut = setTimeout (() => {
      setValues({ title: "", description: "", category: "", day:""});
    }, 20000);
    return () => {
      clearTimeout(warning);
      clearTimeout(timeOut);
    }
  }, [values])


  const paintData = () => 
    items.map((item, index) => (<ToDoItem 
      key={index} 
      data={item} 
      remove={() => removeItem(index)}
      check={() => checkDone(index)} />));


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {...values, done: false}
    console.log(values);
    addItem(newItem);
    setValues({ title: "", description: "", category: "", day: ""})
  };

  return <section>
  <div>
    
  </div>
    <h2>Escribe una tarea</h2>

  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Título</label><br />
    <input type="text" name="title" value={values.title} onChange={handleChange} /><br />

    <label htmlFor="description">Descripción</label><br />
    <input type="text" name="description" value={values.description} onChange={handleChange} /><br />

    <label htmlFor="category">Categoría</label><br />
    <select name="category" value={values.category} onChange={handleChange}>
      <option value="">--Selecciona--</option>
      <option value="hogar">Hogar</option>
      <option value="trabajo">Trabajo</option>
      <option value="familia">Familia</option>
      <option value="ocio">Ocio</option>
    </select> <br />

    <label htmlFor="day">Día</label><br />
    <select name="day" value={values.day} onChange={handleChange}>
      <option value="">--Selecciona--</option>
      <option value="Lunes">Lunes</option>
      <option value="Martes">Martes</option>
      <option value="Miércoles">Miércoles</option>
      <option value="Jueves">Jueves</option>
      <option value="Viernes">Viernes</option>
      <option value="Sábado">Sábado</option>
      <option value="Domingo">Domingo</option>
    </select> <br />

    {values.title && values.description && values.category && values.day ?
       <button type="submit">Crear tarea</button>:
       <b>Rellena todos los campos para poder enviar</b>
       }
        
  </form>

    {paintData()}

  <div className="btn-reset-clear">
    <button onClick={removeAllItems}>Borrar todas las tareas</button>
    <button onClick={resetItems}>Restaurar todas las tareas</button>
  </div>

  </section>;
};

export default ToDoList;
