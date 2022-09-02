import { useEffect } from "react"
import blogsService from "../services/blogs"
import Blog from "./Blog"

const BlogList = ({blogs, setBlogs}) => {



  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    
    <div>
     
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList