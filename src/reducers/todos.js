const initialState = {
  todos: [],
  presentHistory: -2,
  history: [],
};

function addToHistory(state, action) {
  let history = [];
  if (state.todos.length) {
    let present = { id: action.id, text: action.text, completed: action.completed}
    history = [
      ...state.history,
      {
        past: [...state.todos],
        present,
        future: action.type === 'ADD_TODO' ? [...state.todos , present] : [...state.todos.slice(0, state.todos.length - 1), present]
      },
    ];
  }
  return history;
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      let present =  {
        id: action.id,
        text: action.text,
        completed: false,
      }
      action.completed = false     
      return {
        ...state,
        todos: [
          ...state.todos,
         present,
        ],
        presentHistory : state.presentHistory + 1,
        history: addToHistory(state, action),
      };
    case 'TOGGLE_TODO':
      const todosToggle = state.todos.map((todo) => {
        if (todo.id === action.id){ 
          action.completed = !todo.completed;
          action.text = todo.text;
          return { ...todo, completed: !todo.completed } 
        }
        else return todo
      })
      return {
        ...state,
        todos: todosToggle,
        presentHistory : state.presentHistory + 1,
        history: addToHistory(state, action),
      };

    case 'UNDO':
      const lastAction = state.history[state.presentHistory ]; // pop
      return { ...state, presentHistory : state.presentHistory - 1  ,todos: lastAction.past };
    case 'REDO':
        const nextAction = state.history[state.presentHistory + 1];
        return { ...state, presentHistory : state.presentHistory + 1,  todos: nextAction.future };
    default:
      return state;
  }
};

export default todos;
