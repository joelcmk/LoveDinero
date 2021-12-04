import React, { useState } from 'react'
import '../App.css';

function Budget(props) {

  const [homeTarget, setdomeTarget] = useState('600');
  const [foodTarget, setFoodTarget] = useState('400')
  const [home, setHome] = useState({ edit: true, value: '45' });
  const [food, setFood] = useState('');
  const [shopping, setShopping] = useState('');
  const [utilities, setUtilities] = useState('');
  const [household, setHousehold] = useState('');
  const [transportation, setTransportation] = useState();

  const [isNotEditing, setIsNotEditing] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHome({ edit: true })
  }

  console.log(home.value)

  return (
    <div className="budget">
      <div className="test">
        <table className="expenses">
          <tr>
            <th>Category</th>
            <th>Expenses</th>
            <th>Target</th>
          </tr>
          <tr>
            <td>Home</td>
            <td>{props.homeTotal}</td>
            <td>{
              home.edit ?
                <div className="edit">
                  <p className="test1">{home.value}</p>
                  <button onClick={() => setHome({ edit: false })} type="submit">edit</button>
                </div>
                : <div>
                  <input onChange={(e) => setHome({ value: 33 })} />
                  <button onClick={() => setHome({ edit: true })}>Submit</button>
                </div>
            }</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>{props.foodTotal}</td>
            <td className="test2">{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{food}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setFood(`$${e.target.value}`)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>{props.shoppingTotal}</td>
            <td>{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{shopping}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setShopping(`$${e.target.value}`)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>{props.utilitiesTotal}</td>
            <td>{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{utilities}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setUtilities(`$${e.target.value}`)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Household</td>
            <td>{props.householdTotal}</td>
            <td>{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{household}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setHousehold(`$${e.target.value}`)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>{props.transportationTotal}</td>
            <td>{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(`$${e.target.value}`)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
        </table>
      </div>
    </div >
  );
}

export default Budget;