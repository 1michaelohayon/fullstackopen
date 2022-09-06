import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('BlogForm calls its props with the right details when new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')



  await user.type(title, 'testing title bip')
  await user.type(author, 'BAP')
  await user.type(url, 'lol.lol.lol')

  const submitButton = screen.getByText('submit')
  await user.click(submitButton)


  expect(createBlog.mock.calls[0][0].title).toBe('testing title bip')
  expect(createBlog.mock.calls[0][0].author).toBe('BAP')
  expect(createBlog.mock.calls[0][0].url).toBe('lol.lol.lol')
  expect(createBlog.mock.calls).toHaveLength(1)


})