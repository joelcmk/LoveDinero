function ExpensesList(props) {

  return (
    <div>
      <h3>Expenses list</h3>
      {props.data.map(item => (
        <li>
          {item.category} | {item.expense}
        </li>
      ))}
    </div>
  )
}

export default ExpensesList;