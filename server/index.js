const express = require('express');
const app = express();
const port = 3001;
const pg = require('pg');

const connectionUrl =
  'postgres://wqvuvscz:mEbbbHx6mlXN7mLlAvr5sBbAcJuTNWvy@ziggy.db.elephantsql.com:5432/wqvuvscz';
const pool = new pg.Pool({
  connectionString: connectionUrl,
});

const showBooks = (req, res, next) => {
  const text =
    'SELECT public.books.title, public.authors.name FROM public.books INNER JOIN public.authors ON public.books.author_id = public.authors.author_id';
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    res.locals.books = response.rows;
    next();
  });
};

const showAuthor = (req, res, next) => {
  const text = `SELECT public.books.title, public.authors.name FROM public.books INNER JOIN public.authors ON public.books.author_id = public.authors.author_id WHERE public.authors.name = '${req.body.name}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    res.locals.author = response.rows;
    next();
  });
};

const showSingleBook = (req, res, next) => {
  const text = `SELECT public.books.title, public.authors.name FROM public.books INNER JOIN public.authors ON public.books.author_id = public.authors.author_id WHERE public.books.title = '${req.body.title}'`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    console.log(response.rows);
    res.locals.singleBook = response.rows;
    next();
  });
};

app.use(express.json());

app.get('/books', showBooks, (req, res) =>
  res.status(200).json(res.locals.books)
);

app.post('/author', showAuthor, (req, res) => {
  res.status(200).json(res.locals.author);
});

app.post('/singlebook', showSingleBook, (req, res) => {
  res.status(200).json(res.locals.singleBook);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
