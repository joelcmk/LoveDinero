import { Link } from 'react-router-dom'

function ExpensesList(props) {

  return (
    <div>
      <h3>Expenses list</h3>
      <Link className="" to="/"><button>Home</button></Link>
      {props.data.map(item => (
        <li>
          {item.category} | {item.expense}
        </li>
      ))}
    </div>
  )
}

export default ExpensesList;