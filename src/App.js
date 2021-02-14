import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [authorView, toggleAuthorView] = useState(false);

  let bookList = [];
  let authorList = [];

  const displayAuthor = (name) => {
    let author = { name };
    fetch('/author', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    })
      .then((res) => res.json())
      .then((authBooks) => {
        setAuthorBooks(authBooks);
        toggleAuthor();
      });
  };

  const toggleAuthor = () => {
    toggleAuthorView(!authorView);
  };

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then((books) => {
        setBooks(books);
      });
  }, []);

  for (let i = 0; i < authorBooks.length; i++) {
    authorList.push(<li key={i}>{authorBooks[i].title}</li>);
  }
  for (let i = 0; i < books.length; i++) {
    bookList.push(
      <li key={i}>
        {books[i].title},{' '}
        <span
          className="author-name"
          id={books[i].name}
          onClick={(e) => {
            displayAuthor(e.target.id);
          }}
        >
          {books[i].name}
        </span>
      </li>
    );
  }
  return (
    <div className="App">
      {!authorView ? (
        <ul>{bookList}</ul>
      ) : (
        <div>
          <h1>Books by {authorBooks[0].name}</h1>
          <ul>{authorList}</ul>
          <button onClick={toggleAuthor}>Back to List</button>
        </div>
      )}
    </div>
  );
}

export default App;
