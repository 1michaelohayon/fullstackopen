import { List, ListItem, Paper } from '@mui/material'
const IndividualUser = ({ user }) => {
  if (!user) {
    return null
  }
  const Blog = ({ blog }) => <ListItem>{blog.title}</ListItem>
  return (
    <div>
      <h2>{user.name}</h2>
      <h1>added blogs</h1>
      <Paper>
        <List>
          {user.blogs.map((b) => (
            <Blog key={b.id} blog={b} />
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default IndividualUser
