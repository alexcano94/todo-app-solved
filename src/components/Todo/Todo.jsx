import styles from './Todo.module.css';
import Checkbox from './../Checkbox/Checkbox';
import { editTodo } from '../../utils/api';
import { useState } from 'react';
import EditTodo from '../EditTodo/EditTodo';

const Todo = ({ id, text, date, done }) => {
  const [completed, setCompleted] = useState(done);
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState({ id, text, date, done });

  const formattedDate = () => {
    const dueDate = new Date(todo.date);
    return dueDate.getDate()
      + "/"
      + ('0' + (dueDate.getMonth() + 1)).slice(-2)
      + "/"
      + dueDate.getFullYear()
  }

  const Text = ({ text, done }) => {
    return (
      <>
        {done
          ? <span style={{ textDecorationLine: 'line-through', color: 'gray' }}>{text}</span>
          : text}
      </>
    )
  }

  const completeTodo = async () => {
    await editTodo({ id, data: { done: true } });
    setCompleted(true);
  }

  const EditTodoButton = ({ setEdit }) => {
    return (
      <div>
        <button onClick={() => setEdit(true)} className={styles.editTodo}>
          Edit
        </button>
      </div>
    )
  }

  return (edit && !completed) ? (<EditTodo id={id} setEdit={setEdit} updateTodo={setTodo} />)
    : (< div className={styles.todo} >
      <div className={styles.todoTitle}>
        {!completed && <EditTodoButton setEdit={setEdit} />}
        <p className={styles.dueDate}>
          <span style={{ "fontWeight": "500" }}>Due date:</span> {formattedDate()}
        </p>
      </div>
      <div className={styles.todoBody}>
        <Checkbox complete={completeTodo} done={completed} />
        <p className={styles.text} >
          <Text text={todo.text} done={completed} />
        </p>
      </div>
    </div >)
}

export default Todo;