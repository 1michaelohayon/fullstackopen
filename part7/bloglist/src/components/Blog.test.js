import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()
  const blog = {
    id: 1,
    title: 'bot title',
    author: 'testBot',
    likes: 5,
    url: 'www.testerbot.botcom',
    user: { id: 7, name: 'botito' },
  }
  beforeEach(() => {
    container = render(<Blog blog={blog} likeBtn={mockHandler} />)
  })

  test('render blog title and author but not its url/likes by default', () => {
    const div = document.querySelector('.blog')

    expect(div).toContainHTML(`${blog.title} ${blog.author}`)
    expect(div).not.toContainHTML(blog.url)
    expect(div).not.toContainHTML('likes')
  })

  test("blog's content shows when the view button is clicked", async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const div = document.querySelector('.blog')

    expect(div).toContainHTML(`${blog.title} ${blog.author}`)
    expect(div).toContainHTML(blog.url)
    expect(div).toContainHTML('likes')
    expect(div).toContainHTML('likes')
  })

  test('like button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
