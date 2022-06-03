const API = process.env.REACT_APP_API;

const createTodo = ({ data }) => {
  const payload = {
    fecha: data.date,
    text: data.text,
    done: false
  }
  return fetch(`${API}/todo`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.json());
}

const editTodo = ({ id, data }) => {
  return fetch(`${API}/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

const getAllTodos = async () => {
  return fetch(`${API}/todo`).then(response => response.json()).then(todos => todos.map(todo => ({ ...todo, id: todo._id })));
}

const getTodo = ({ id }) => {
  return fetch(`${API}/todo/${id}`).then(response => response.json());
}

const deleteTodo = ({ id }) => {
  return fetch(`${API}/todo/${id}`, { method: 'DELETE' });
}

export {
  createTodo,
  editTodo,
  getAllTodos,
  getTodo,
  deleteTodo,
}