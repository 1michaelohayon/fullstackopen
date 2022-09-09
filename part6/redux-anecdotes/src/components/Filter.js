import { connect } from "react-redux";
import { filterInput } from "../reducers/searchFilterReducer";

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    props.filterInput(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterInput: value => {
      dispatch(filterInput(value))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)