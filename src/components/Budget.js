import React, { useState } from 'react'
import '../App.css';

function Budget(props) {

  const [homeTarget, setHomeTarget] = useState('600');
  const [foodTarget, setFoodTarget] = useState('400')
  const [home, setHome] = useState('');
  const [food, setFood] = useState('');
  const [shopping, setShopping] = useState('');
  const [utilities, setUtilities] = useState('');
  const [household, setHousehold] = useState('');
  const [transportation, setTransportation] = useState(40);

  const handleSubmit = (e, target, val) => {
    e.preventDefault();
    target(home);
    setIsEditing(false);
  }

  const [isEditing, setIsEditing] = useState(false)
  const [test, setTest] = useState(true)



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
        </div>
        <div>
          <h2>Expenses</h2>
          <p>{props.homeTotal}</p>
          <p>{props.foodTotal}</p>
          <p>{props.shoppingTotal}</p>
          <p>{props.utilitiesTotal}</p>
          <p>{props.householdTotal}</p>
          <p>{props.transportationTotal}</p>
          <h3>Total: {props.total}</h3>
        </div>
        <div>
          <h2>Target</h2>
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setHomeTarget, home)}>
                <input type='text' onChange={(e) => setHome(e.target.value)} defaultValue={home} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)}>{homeTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget, food)}>
                <input type='text' onChange={(e) => { setFood(e.target.value) }} defaultValue={food} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setShopping)}>
                <input type='text' onChange={(e) => { setShopping(e.target.value) }} defaultValue={shopping} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setUtilities)}>
                <input type='text' onChange={(e) => { setUtilities(e.target.value) }} defaultValue={utilities} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setHousehold)}>
                <input type='text' onChange={(e) => { setHousehold(e.target.value) }} defaultValue={household} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          <div>
            <p>{transportation}</p>
            {
              //if click button
              test ?
                <form>
                  <p>45</p>
                  <button onClick={() => setTest(false)} type="submit">edit</button>
                </form>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setTest(true)}>Submit</button>
                </form>
              //then open input 
              //after submit add data to transportation
            }
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;