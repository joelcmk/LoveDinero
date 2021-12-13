function Input(props) {
  const handleChange = (e) => {
    props.setExpense(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSubmit('next');
  };
  return (
    <din>
      <form className="input" onSubmit={handleSubmit}>
        <input type="number" placeholder="New Expense" name="expense" id="expense" value={props.expense} onChange={handleChange} />
        <button type="submit">Next</button>
      </form>
      {/*
        <form className="input" onSubmit={handleIncome}>
          <input type="number" placeholder="Add Income" name="income" id="income" value={props.income} onChange={hanldeIncomeChange} />
          <button type="submit">Submit</button>
        </form>
      */}
    </din>
  );
}

export default Input;