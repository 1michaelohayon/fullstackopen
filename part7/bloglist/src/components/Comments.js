import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const content = useField('text')

  const createComment = (event) => {
    event.preventDefault()
    const commentObject = {
      content: content.value,
      blog: blog.id,
    }

    dispatch(addComment(blog, commentObject))
    content.onChange('', true)
  }
  const Comment = ({ comment }) => <li>{comment.content}</li>

  return (
    <div>
      <form onSubmit={createComment}>
        <div>
          <input id="Comment" {...content} />
          <button type="submit">submit</button>
        </div>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
      </ul>
    </div>
  )
}

export default Comments
