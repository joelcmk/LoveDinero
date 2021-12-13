import React, { useState } from 'react';
import Input from '../components/Input';
import '../App.css';

import { Link } from 'react-router-dom';

function Budget(props) {

  const [home, setHome] = useState('300');
  const [food, setFood] = useState('300');
  const [shopping, setShopping] = useState('300');
  const [utilities, setUtilities] = useState('300');
  const [household, setHousehold] = useState('300');
  const [transportation, setTransportation] = useState('300');
  const [other, setOther] = useState('300');

  const [homeEdit, setHomeEdit] = useState(true);
  const [foodEdit, setFoodEdit] = useState(true);
  const [shoppingEdit, setShoppingEdit] = useState(true);
  const [utilitiesEdit, setUtilitiesEdit] = useState(true);
  const [householdEdit, setHouseholdEdit] = useState(true);
  const [transportationEdit, setTransportationEdit] = useState(true);
  const [otherEdit, setOtherEdit] = useState(true);



  return (
    <div>
      <Input setExpense={props.setExpense} setSubmit={props.setSubmit} income={props.income} expense={props.expense} />
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
              <td><span>$</span>{props.categoryTotal('home')}</td>
              <td>{
                homeEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{home}</p>
                    <button onClick={() => setHomeEdit(false)} type="submit">edit</button>
                  </div>
                  : <div>
                    <input type="number" onChange={(e) => setHome(e.target.value)} />
                    <button onClick={() => setHomeEdit(true)}>Submit</button>
                  </div>
              }</td>
            </tr>
            <tr>
              <td>Food</td>
              <td><span>$</span>{props.categoryTotal('food')}</td>
              <td className="test2">{
                foodEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{food}</p>
                    <button onClick={() => setFoodEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setFood(e.target.value)} />
                    <button onClick={() => setFoodEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
            <tr>
              <td>Shopping</td>
              <td><span>$</span>{props.categoryTotal('shopping')}</td>
              <td>{
                shoppingEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{shopping}</p>
                    <button onClick={() => setShoppingEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setShopping(e.target.value)} />
                    <button onClick={() => setShoppingEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
            <tr>
              <td>Utilities</td>
              <td><span>$</span>{props.categoryTotal('utilities')}</td>
              <td>{
                utilitiesEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{utilities}</p>
                    <button onClick={() => setUtilitiesEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setUtilities(e.target.value)} />
                    <button onClick={() => setUtilitiesEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
            <tr>
              <td>Household</td>
              <td><span>$</span>{props.categoryTotal('household')}</td>
              <td>{
                householdEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{household}</p>
                    <button onClick={() => setHouseholdEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setHousehold(e.target.value)} />
                    <button onClick={() => setHouseholdEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td><span>$</span>{props.categoryTotal('transportation')}</td>
              <td>{
                transportationEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{transportation}</p>
                    <button onClick={() => setTransportationEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setTransportation(e.target.value)} />
                    <button onClick={() => setTransportationEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
            <tr>
              <td>Other</td>
              <td><span>$</span>{props.categoryTotal('other')}</td>
              <td>{
                otherEdit ?
                  <div className="edit">
                    <p className="test1"><span>$</span>{other}</p>
                    <button onClick={() => setOtherEdit(false)} type="submit">edit</button>
                  </div>
                  : <form>
                    <input type="number" onChange={(e) => setOther(e.target.value)} />
                    <button onClick={() => setOtherEdit(true)}>Submit</button>
                  </form>
              }</td>
            </tr>
          </table>
        </div>
      </div>
      <Link className="expenses_list" to="/expenses"><button>Expenses List</button></Link>
    </div >
  );
}

export default Budget;