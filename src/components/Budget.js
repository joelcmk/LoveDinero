function Budget(props) {

  console.log(props.newExpense)
  return (
    <div>
      {props.newExpense.expense} | {props.newExpense.category}
    </div>
  );
}

export default Budget;