import { useState } from "react"


const Blog = ({ blog, likeBtn, removeBtn }) => {
  const [content, setContent] = useState('false')

  const blogSyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5

  }
  

  const blogContent = () => {
    if (!content){
      return (
    <div >       
      {blog.url} <br />
      likes {blog.likes} <button onClick={likeBtn}>like</button> <br/>
      {blog.user.name} <br />
      <button onClick={removeBtn}>remove</button>
    </div>
      )
    }
  }

  const toggle = () => setContent(!content)

  return (
    <div className="blog" style={blogSyle}>
      <div >{blog.title} {blog.author} <button onClick={toggle}>{content ? 'view' : 'hide'}</button></div>
      {blogContent()}
    </div>
  )
}
export default Blog