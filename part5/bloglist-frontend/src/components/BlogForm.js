import { useState } from "react"
import blogsService from "../services/blogs"


const BlogForm = ({ blogs, setBlogs, setErMsg, setErMod }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

      setErMod(false)
      setErMsg(`a new blog ${title} by ${author} added`)
      setTimeout(() => { setErMsg(null) }, 5000)

    } catch (exception) {
      console.log(exception)

      setErMod(true)
      setErMsg(`missing input`)
      setTimeout(() => { setErMsg(null) }, 5000)

    }

  }

  return (
    <div>
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