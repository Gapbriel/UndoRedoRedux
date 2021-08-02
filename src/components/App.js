import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Undo from '../containers/Undo'

const App = () => (
  <div>
    <Undo />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
