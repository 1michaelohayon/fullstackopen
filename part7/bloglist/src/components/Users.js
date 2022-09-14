import { useResource } from '../hooks'
import { Link } from 'react-router-dom'
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
} from '@mui/material'
const Users = (props) => {
  const [users, usersService] = useResource('/api/users')
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
