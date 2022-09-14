import { Link } from 'react-router-dom'
import { ListItem } from '@mui/material'
const Blog = ({ blog }) => {
  return (
    <ListItem>
      <div className="blog">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </ListItem>
  )
}
export default Blog
