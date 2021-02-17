import './App.css';
import { useState, useEffect } from 'react';
import DupePopup from './components/DupePopup';

function App() {
  // All the books
  const [books, setBooks] = useState([]);
  // State related to single book view
  const [singleBook, setSingleBook] = useState([]);
  const [bookView, toggleBookView] = useState(false);
  // State related to author view
  const [authorBooks, setAuthorBooks] = useState([]);
  const [authorView, toggleAuthorView] = useState(false);
  // State related to marking and viewing duplicates
  const [dupeView, toggleDupeView] = useState(false);
  const [dupe, setDupe] = useState('');
  const [dupes, setDupes] = useState([]);

  // Containers for JSX to display items from DB
  let bookList = [];
  let authorList = [];
  let dupeList = [];

  // Gets author by name for author view
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

  // Gets book by title for single book view
  const displayBook = (title) => {
    let bookTitle = { title };
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
      });
  };

  // Gets duplicates of particular book
  const displayDupes = (title) => {
    fetch('/showdupes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((dupes) => {
        setDupes(dupes);
      });
  };

  // Toggle views off and on
  const toggleAuthor = () => {
    toggleAuthorView(!authorView);
  };

  const toggleBook = () => {
    toggleBookView(!bookView);
  };

  const toggleDupe = () => {
    toggleDupeView(!dupeView);
  };

  // When app starts, we display all the books
  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then((books) => {
        setBooks(books);
      });
  }, []);

  // These fill in the JSX arrays with elements from DB
  for (let i = 0; i < authorBooks.length; i++) {
    authorList.push(<li key={i}>{authorBooks[i].title}</li>);
  }

  for (let i = 0; i < dupes.length; i++) {
    dupeList.push(<li key={i}>{dupes[i].title}</li>);
  }
  for (let i = 0; i < books.length; i++) {
    bookList.push(
      <li key={i}>
        <span
          className="book-name"
          id={books[i].title}
          onClick={(e) => {
            displayBook(e.target.id);
            displayDupes(e.target.id);
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
      {/* default view if not looking at author, book, or marking dupe */}
      {!authorView && !bookView && !dupeView && (
        <div>
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
        </div>
      )}
      {/* conditional rendering of author view */}
      {authorView && (
        <div className="centered">
          <h1>Books by {authorBooks[0].name}</h1>
          <ul>{authorList}</ul>
          <button onClick={toggleAuthor}>Back to List</button>
        </div>
      )}
      {/* conditional rendering of single book view */}
      {bookView && (
        <div className="centered">
          <h1>{singleBook[0].title}</h1>
          <h2>{singleBook[0].name}</h2>
          {dupeList.length > 0 && (
            <div>
              <h3>Duplicates:</h3>
              <ul>{dupeList}</ul>
            </div>
          )}
          {singleBook[0].duplicate_of && (
            <p>Duplicate of {singleBook[0].duplicate_of} </p>
          )}
          <button onClick={toggleBook}>Back to List</button>
        </div>
      )}
      {/* conditional rendering of mark dupe functionality, triggered when checkbox clocked clicked  */}
      {dupeView && <DupePopup dupe={dupe} toggleDupe={toggleDupe} />}
    </div>
  );
}

export default App;
