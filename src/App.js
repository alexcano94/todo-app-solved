import styles from './App.module.css';
import { useState, useEffect } from 'react';
import Todo from './components/Todo/Todo';
import CreateTodo from './components/CreateTodo/CreateTodo';
import { getAllTodos, createTodo } from './utils/api';

function App() {

  const [todos, setTodos] = useState([])
  const [creating, setCreating] = useState(false);

  async function fetchData() {
    const todos = await getAllTodos();
    setTodos(todos);
  }

  useEffect(() => {
    // GET ALL API
    fetchData();
  }, [""]);


  const insertTodo = async ({ data }) => {
    await createTodo({ data });
    fetchData();
    setCreating(false);
  }

  const NewTodoButton = ({ setCreating }) => {
    return (
      <div>
        <button onClick={() => setCreating(true)} className={styles.newTodo}>
          +
        </button>
      </div>

    )
  }

  return (
    <div className={styles.container}>
      {!creating && <NewTodoButton setCreating={setCreating} />}
      {creating && <CreateTodo createTodo={insertTodo} setCreating={setCreating}></CreateTodo>}
      {todos.map(({ id, text, fecha, done }) =>
        <Todo
          key={id}
          id={id}
          text={text}
          date={fecha}
          done={done}
        />)}

    </div>
  );
}

export default App;