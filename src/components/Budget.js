import '../App.css';

function Budget(props) {

  return (
    <div className="budget">
      <div className="expenses">
        <div>
          <h2>Category</h2>
          <p>Home</p>
          <p>Food</p>
          <p>shopping</p>
          <p>Utilities</p>
          <p>Household</p>
          <p>Transportation</p>
          <h3>Total: {props.total}</h3>
        </div>
        <div>
          <h2>Expenses</h2>
          <p>{props.homeTotal}</p>
          <p>{props.foodTotal}</p>
          <p>{props.shoppingTotal}</p>
          <p>{props.utilitiesTotal}</p>
          <p>{props.householdTotal}</p>
          <p>{props.transportationTotal}</p>
        </div>
        <div>
          <h2>Target</h2>
          <p>600</p>
          <p>600</p>
          <p>600</p>
          <p>600</p>
          <p>600</p>
          <p>600</p>
        </div>
      </div>
    </div>
  );
}

export default Budget;