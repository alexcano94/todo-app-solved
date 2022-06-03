import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editTodo, getTodo } from "../../utils/api";
import styles from "./EditTodo.module.css";

const EditTodo = ({ id, setEdit, updateTodo }) => {
  const { register, handleSubmit } = useForm();
  const [todo, setTodo] = useState({ text: "", date: new Date() });

  async function fetchData() {
    const response = await getTodo({ id });
    setTodo({ ...todo, ...response, date: response.fecha });
  }

  useEffect(() => {
    fetchData();
  }, [''])

  const submit = async (data) => {
    const todo = await editTodo({ id, data });
    updateTodo({ ...todo, date: todo.fecha });
    setEdit(false);
  }

  return (
    <div className={styles.todo}>
      <button onClick={() => setEdit(false)} className={styles.closeEdit}>X</button>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register('text', { required: true })}
          defaultValue={todo.text}
          type="text"
          placeholder="Action to do"
          className={styles.input}
        />
        <input
          {...register('date', { required: true })}
          defaultValue={todo.fecha}
          type="date"
          placeholder="Due date"
          className={styles.input}
        />
        <button className={styles.button} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditTodo;