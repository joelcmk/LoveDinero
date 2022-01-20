import Navbar from './Navbar';
import '../App.css'

function ExpensesList(props) {

  return (
    <div>
      <Navbar />
      <div className="expenses_list_card">
        <h3>Expenses list</h3>
        <table className="expenses_list_ul">
          {props.data.map(item => (
            <tr>
              <td className="expenses_list_category">{item.category}</td>
              <td className="expenses_list_expense">{item.expense}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default ExpensesList;