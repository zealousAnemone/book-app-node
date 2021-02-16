import { useState } from 'react';

const DupePopup = (props) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const markDupe = (dupe, original) => {
    console.log(`${dupe} is a copy of ${original}`);
  };

  return (
    <div id="dupe-popup">
      <p>Which book is {props.dupe} a duplicate of?</p>
      <input type="text" value={value} onChange={handleChange}></input>
      <button onClick={() => markDupe(props.dupe, value)}>
        Mark as duplicate
      </button>
      <button>Cancel</button>
    </div>
  );
};

export default DupePopup;
