const DupePopup = (props) => {
  const markDupe = (dupe, original) => {
    return `${dupe} is a dupe!`;
  };

  return (
    <div id="dupe-popup">
      <h1>{markDupe(props.dupe)}</h1>
    </div>
  );
};

export default DupePopup;
