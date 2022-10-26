import React, { useState } from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { Todo } from "./TodoView";
import userEvent from '@testing-library/user-event'


const TodoTest = () => {
  const [todos, setTodos] = useState([{ _id: 'test', text: 'testing todos..', done: false }]);

  const handleCreateTodo = ({ text }) => {
    const updatedTodos = todos.concat({ _id: text, text, done: false });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (todo) => {
    const updatedTodos = todos.filter(t => t._id !== todo._id)
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (todo) => {
    const updatedTodos = todos.filter(t => t._id !== todo._id)
    setTodos(updatedTodos.concat({ ...todo, done: true }));
  };


  return <Todo
    todos={todos}
    createTodo={handleCreateTodo}
    deleteTodo={handleDeleteTodo}
    completeTodo={handleCompleteTodo}
  />
}


describe('<TodoView />', () => {
  it('renders a page with Todo listing', () => {
    render(<TodoTest />)
    const title = screen.getByText('Todos')
    const submitButton = screen.getByText('Submit')
    const todoItem = screen.getByText('testing todos..')
    const falseStatus = screen.getByText('This todo is not done')

    expect(title).toBeDefined()
    expect(submitButton).toBeDefined()
    expect(todoItem).toBeDefined()
    expect(falseStatus).toBeDefined()

  });

  it('can to add new todo', async () => {
    const user = userEvent.setup()
    render(<TodoTest />)

    const input = screen.getByRole('textbox')
    const submitButton = screen.getByText('Submit')

    const text = 'adding second todo..'
    await user.type(input, text)
    await user.click(submitButton)

    const newItem = screen.getByText(text)

    expect(newItem).toBeDefined()
  });

  it('can complete todo', async () => {
    const user = userEvent.setup()
    render(<TodoTest />)

    const falseStatus = screen.getByText('This todo is not done')
    
    expect(falseStatus).toBeDefined()

    const setDoneButton = screen.getByText('Set as done')
    await user.click(setDoneButton)

    const trueStatus = screen.getByText('This todo is done');

    expect(trueStatus).toBeDefined()

  });

  it('can delete todo', async () => {
    const user = userEvent.setup()
    render(<TodoTest />)
    
    const deleteButton = screen.getByText('Delete')
    const todoItem = screen.getByText('testing todos..')
    

    expect(todoItem).toBeVisible()
    
    await user.click(deleteButton)

    expect(todoItem).not.toBeVisible()


  })


})