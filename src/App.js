import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  let bookList = [];

  const displayAuthor = (name) => {
    let author = { name };
    fetch('/author', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then((books) => {
        setBooks(books);
      });
  }, []);

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
      <ul>{bookList}</ul>
    </div>
  );
}

export default App;
