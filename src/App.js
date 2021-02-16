import './App.css';
import { useState, useEffect } from 'react';
import DupePopup from './components/DupePopup';

function App() {
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState([]);
  const [bookView, toggleBookView] = useState(false);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [authorView, toggleAuthorView] = useState(false);
  const [dupeView, toggleDupeView] = useState(false);
  const [dupe, setDupe] = useState('');

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

  const displayBook = (title) => {
    let bookTitle = { title };
    console.log('displayBook: ', bookTitle);
    fetch('/singlebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookTitle),
    })
      .then((res) => res.json())
      .then((singleBook) => {
        setSingleBook(singleBook);
        toggleBook();
        console.log(singleBook);
      });
  };

  const toggleAuthor = () => {
    toggleAuthorView(!authorView);
  };

  const toggleBook = () => {
    toggleBookView(!bookView);
  };

  const toggleDupe = () => {
    toggleDupeView(!dupeView);
    console.log(dupeView);
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
        <span
          className="book-name"
          id={books[i].title}
          onClick={(e) => {
            displayBook(e.target.id);
          }}
        >
          {books[i].title}
        </span>
        <span
          className="author-name"
          id={books[i].name}
          onClick={(e) => {
            displayAuthor(e.target.id);
          }}
        >
          {books[i].name}
        </span>
        <input
          type="checkbox"
          id={books[i].title}
          onClick={() => {
            setDupe(books[i].title);
            toggleDupe();
          }}
        ></input>
      </li>
    );
  }
  return (
    <div className="App">
      {!authorView && !bookView && !dupeView && (
        <ul>
          <li>
            <span className="header">
              <span className="book-name">Title</span>
              <span className="author-name">Author</span>{' '}
              <span className="mark-dupe">Duplicate?</span>
            </span>
          </li>
          {bookList}
        </ul>
      )}
      {authorView && (
        <div className="centered">
          <h1>Books by {authorBooks[0].name}</h1>
          <ul>{authorList}</ul>
          <button onClick={toggleAuthor}>Back to List</button>
        </div>
      )}
      {bookView && (
        <div className="centered">
          <h1>{singleBook[0].title}</h1>
          <h2>{singleBook[0].name}</h2>
          <button onClick={toggleBook}>Back to List</button>
        </div>
      )}
      {dupeView && <DupePopup dupe={dupe} />}
    </div>
  );
}

export default App;
