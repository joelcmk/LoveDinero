import React, { useState } from 'react'
import '../App.css';

function Budget(props) {

  const [homeTarget, setdomeTarget] = useState('600');
  const [foodTarget, setFoodTarget] = useState('400')
  const [home, setdome] = useState(40);
  const [food, setFood] = useState('');
  const [shopping, setShopping] = useState('');
  const [utilities, setUtilities] = useState('');
  const [household, setHousehold] = useState('');
  const [transportation, setTransportation] = useState(40);

  const handleSubmit = (e, target, val) => {
    e.preventDefault();
    target(home);
    setIsNotEditing(false);
  }

  const [isNotEditing, setIsNotEditing] = useState(true)
  const [test, setTest] = useState(true)



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
            <td>69</td>
            <td>{
              test ?
                <div className="edit">
                  <p className="test1">{home}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>69</td>
            <td className="test2">{
              test ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Shopping</td>
            <td>69</td>
            <td>{
              test ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>69</td>
            <td>{
              test ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Household</td>
            <td>69</td>
            <td>{
              test ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>69</td>
            <td>{
              isNotEditing ?
                <div className="edit">
                  <p className="test1">{transportation}</p>
                  <button onClick={() => setIsNotEditing(false)} type="submit">edit</button>
                </div>
                : <form>
                  <input onChange={(e) => setTransportation(e.target.value)} />
                  <button onClick={() => setIsNotEditing(true)}>Submit</button>
                </form>
            }</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Budget;