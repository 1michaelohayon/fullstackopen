import { useEffect } from "react"
import blogsService from "../services/blogs"
import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, setErMsg, setErMod }) => {
  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])


  const likeBtn = async blog => {
    try {
      const response = await blogsService
        .update(blog)
      const updatedBlogs = blogs.map(b => b.id === response.id
        ? Object.assign(b => b.id === response.id, response)
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
      await blogsService
        .remove(blog)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
   
  }

  return (

    <div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBtn={likeBtn} removeBtn={removeBtn} />
      )}
    </div>
  )
}

export default BlogList