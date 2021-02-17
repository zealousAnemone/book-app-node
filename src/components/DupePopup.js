import { useState } from 'react';

const DupePopup = (props) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const markDuplicate = (dupe, original) => {
    console.log(`${dupe} is a copy of ${original}`);
    fetch('/markdupe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dupe, original }),
    })
      .then((res) => res.json())
      .then(() => {
        props.toggleDupe();
      });
  };

  return (
    <div id="dupe-popup">
      <p>Which book is {props.dupe} a duplicate of?</p>
      <input type="text" value={value} onChange={handleChange}></input>
      <button onClick={() => markDuplicate(props.dupe, value)}>
        Mark as duplicate
      </button>
      <button onClick={props.toggleDupe}>Cancel</button>
    </div>
  );
};

export default DupePopup;
