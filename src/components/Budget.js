import React, { useState } from 'react'
import '../App.css';

function Budget(props) {

  const [homeTarget, setHomeTarget] = useState('600');
  const [foodTarget, setFoodTarget] = useState('400')
  const [test, setTest] = useState('');


  const updateTarget = (e) => {
    setTest(e.target.value);
  }

  const handleSubmit = (e, target) => {
    e.preventDefault();
    target(test);
    setIsEditing(false);
  }

  const [isEditing, setIsEditing] = useState(false)



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
              <form onSubmit={(e) => handleSubmit(e, setHomeTarget)}>
                <input type='text' onChange={updateTarget} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)}>{homeTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget)}>
                <input type='text' onChange={(e) => { setTest(e.target.value) }} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget)}>
                <input type='text' onChange={(e) => { setTest(e.target.value) }} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget)}>
                <input type='text' onChange={(e) => { setTest(e.target.value) }} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget)}>
                <input type='text' onChange={(e) => { setTest(e.target.value) }} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          {
            isEditing ?
              <form onSubmit={(e) => handleSubmit(e, setFoodTarget)}>
                <input type='text' onChange={(e) => { setTest(e.target.value) }} defaultValue={test} />
              </form>
              : <p onDoubleClick={() => setIsEditing(true)} >{foodTarget}</p>
          }
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;