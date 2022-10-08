function NewExpense(props) {
  const handleChange = (e) => {
    props.setExpense(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSubmit('next');
  };
  return (
    <div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="New Expense"
          name="expense"
          id="expense"
          value={props.expense}
          onChange={handleChange}
        />
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default NewExpense;
