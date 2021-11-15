import React, { useState } from 'react';
import './App.css';

const App = function () {

  const [item, setItem] = useState('');
  const [items, setItems] = useState('')
  const [submit, setSubmit] = useState('')

  const handleChange = (e) => {
    setItem(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(item)
    setSubmit('next')
  }

  if (submit === '') {
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>Add expense</label>
          <input name="expense" id="expense" value={item} onChange={handleChange} />
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }

  if (submit === 'next') {
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>Select a category</label>
          <input name="expense" id="expense" value={item} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export default App;
