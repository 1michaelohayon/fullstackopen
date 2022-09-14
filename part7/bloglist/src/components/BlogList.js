import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'
import Togglable from './Toggleable'
import BlogForm from './BlogForm'
import { useEffect } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>Create new</h2>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList

export const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  const likeBtn = () => {
    dispatch(likeBlog(blog))
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={likeBtn}>like</button> <br />
        added by {blog.user.name}
      </div>
      <h3>comments</h3>
      <Comments blog={blog} />
    </div>
  )
}
