import { useEffect } from "react"
import blogsService from "../services/blogs"
import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, setErMsg, setErMod }) => {
  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])


  const likeBtn = async (blog) => {
    const addedLike = {...blog, likes: blog.likes + 1}
    try {
      const response = await blogsService
        .update(addedLike)
      const updatedBlogs = blogs.map(b => b.id === response.id
        ? Object.assign(b => b.id === response.id, addedLike)
        : b)

      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
    catch (exception) {
      setErMod(true)
      setErMsg(`${blog.title} was already deleted`)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
    setTimeout(() => { setErMsg(null) }, 5000)
  }
  const removeBtn = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
      await blogsService
        .remove(blog)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }
  }

  return (

    <div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBtn={() => likeBtn(blog)} removeBtn={() => removeBtn(blog)} />
      )}
    </div>
  )
}

export default BlogList