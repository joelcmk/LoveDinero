import React, { useState } from 'react'
import '../App.css';

function Budget(props) {

  const [home, setHome] = useState('300');
  const [food, setFood] = useState('300');
  const [shopping, setShopping] = useState('300');
  const [utilities, setUtilities] = useState('300');
  const [household, setHousehold] = useState('300');
  const [transportation, setTransportation] = useState('300');

  const [homeEdit, setHomeEdit] = useState(true);
  const [foodEdit, setFoodEdit] = useState(true);
  const [shoppingEdit, setShoppingEdit] = useState(true);
  const [utilitiesEdit, setUtilitiesEdit] = useState(true);
  const [householdEdit, setHouseholdEdit] = useState(true);
  const [transportationEdit, setTransportationEdit] = useState(true);

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
              homeEdit ?
                <div className="edit">
                  <p className="test1">{home}</p>
                  <button onClick={() => setHomeEdit(false)} type="submit">edit</button>
                </div>
                : <div>
                  <input onChange={(e) => setHome(`$${e.target.value}`)} />
                  <button onClick={() => setHomeEdit(true)}>Submit</button>
                </div>
            }</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>{props.foodTotal}</td>
            <td className="test2">{
              foodEdit ?
                <div className="edit">
                  <p className="test1">{food}</p>
                  <button onClick={() => setFoodEdit(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setFood(`$${e.target.value}`)} />
                  <button onClick={() => setFoodEdit(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>{props.shoppingTotal}</td>
            <td>{
              shoppingEdit ?
                <div className="edit">
                  <p className="test1">{shopping}</p>
                  <button onClick={() => setShoppingEdit(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setShopping(`$${e.target.value}`)} />
                  <button onClick={() => setShoppingEdit(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>{props.utilitiesTotal}</td>
            <td>{
              utilitiesEdit ?
                <div className="edit">
                  <p className="test1">{utilities}</p>
                  <button onClick={() => setUtilitiesEdit(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setUtilities(`$${e.target.value}`)} />
                  <button onClick={() => setUtilitiesEdit(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Household</td>
            <td>{props.householdTotal}</td>
            <td>{
              householdEdit ?
                <div className="edit">
                  <p className="test1">{household}</p>
                  <button onClick={() => setHouseholdEdit(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setHousehold(`$${e.target.value}`)} />
                  <button onClick={() => setHouseholdEdit(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>{props.transportationTotal}</td>
            <td>{
              transportationEdit ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setTransportationEdit(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(`$${e.target.value}`)} />
                  <button onClick={() => setTransportationEdit(true)}>Submit</button>
                </form>
            }</td>
          </tr>
        </table>
      </div>
    </div >
  );
}

export default Budget;