import { useState } from "react"
import Notifcation from "./Notification"
import blogsService from "../services/blogs"


const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [error, setError] = useState(false)


  const creteBlog = async (event) => {
    event.preventDefault()
    console.log(title, author, url)

    try {
      const newBlog = {
        title,
        author,
        url,
      }
      const response = await blogsService
        .create(newBlog)

      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

      setError(false)
      setNotiMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => { setNotiMessage(null) }, 5000)

    } catch (exception) {
      console.log(exception)

      setError(true)
      setNotiMessage(`missing input`)
      setTimeout(() => { setNotiMessage(null) }, 5000)

    }

  }

  return (
    <div>
      <Notifcation message={notiMessage} error={error} />
      <form onSubmit={creteBlog}>
        <div>
          title
          <input type="text" value={title} name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input type="text" value={author} name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input type="text" value={url} name="Url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )

}

export default BlogForm