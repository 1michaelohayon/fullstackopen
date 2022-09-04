import { useState } from "react"


const Blog = ({ blog, likeBtn, removeBtn }) => {
  const [visible, setVisible] = useState('false')


  const blogSyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5

  }


  
  const addLike = () => {
    likeBtn({
      user: blog.user,
      likes: blog.likes + 1,
      auhtor: blog.auhtor,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
 
  }


  const toggle = () => setVisible(!visible)

  return (
    <>
      {visible === false
        ? <div style={blogSyle}>
          <div>{blog.title} <button onClick={toggle}>hide</button></div>
          {blog.url} <br />
          likes {blog.likes} <button onClick={addLike}>like</button><br />
          {blog.author}
          <button onClick={() => removeBtn(blog)}>remove</button>
        </div>
        : <div style={blogSyle}>{blog.title} <button onClick={toggle}>view</button></div>}
    </>
  )
}
export default Blog