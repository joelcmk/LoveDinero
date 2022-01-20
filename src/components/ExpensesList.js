import Navbar from './Navbar';
import '../App.css'

function ExpensesList(props) {

  return (
    <div>
      <Navbar />
      <div className="expenses_list_card">
        <h3>Expenses list</h3>
        <ul className="expenses_list_ul">
          {props.data.map(item => (
            <li>
              <div className="expenses_list_expense">{item.expense}</div> <div className="expenses_list_category">{item.category}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ExpensesList;