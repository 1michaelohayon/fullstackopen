const IndividualUser = ({ user }) => {
  if (!user) {
    return null
  }
  const Blog = ({ blog }) => <li>{blog.title}</li>
  return (
    <div>
      <h2>{user.name}</h2>
      <h1>added blogs</h1>
      <ul>
        {user.blogs.map((b) => (
          <Blog key={b.id} blog={b} />
        ))}
      </ul>
    </div>
  )
}

export default IndividualUser
