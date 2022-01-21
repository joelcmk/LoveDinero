import Navbar from './Navbar';
import { getDatabase, ref, set } from "firebase/database";
import '../App.css'

function ExpensesList(props) {

  function update() {
    const db = getDatabase();
    update(ref(db, 'users' + props.userId), {

    })
  }

  console.log(props.data)

  return (
    <div>
      <Navbar />
      <div className="expenses_list_card">
        <h3>Expenses list</h3>
        <table className="expenses_list_table">
          {props.data.map(item => (
            <tr>
              <td className="expenses_list_category">{item.category}</td>
              <td className="expenses_list_expense">{item.expense}</td>
              <td><button onClick={() => console.log(item.id)} >Update</button><button>Delete</button></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default ExpensesList;