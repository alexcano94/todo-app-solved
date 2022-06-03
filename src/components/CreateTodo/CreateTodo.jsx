import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTodo, getTodo } from "../../utils/api";
import styles from "./CreateTodo.module.css"

const CreateTodo = ({ createTodo, setCreating }) => {
  const { register, handleSubmit } = useForm();
  const [todo, setTodo] = useState({ text: '', date: undefined });

  const submit = async (data) => {
    await createTodo({ data });
  }

  return (
    <div className={styles.todo}>
      <button onClick={() => setCreating(false)} className={styles.closeCreate}>X</button>
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
          defaultValue={todo.date}
          type="date"
          placeholder="Due date"
          className={styles.input}
        />
        <button className={styles.button} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateTodo;